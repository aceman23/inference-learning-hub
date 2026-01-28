import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, CourseSection, SectionDiagram } from '../lib/supabase';
import { ArrowLeft, Plus, Trash2, Edit2, Image as ImageIcon, Save, X } from 'lucide-react';

interface DiagramWithSection extends SectionDiagram {
  section_title?: string;
}

export const DiagramManager: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [diagrams, setDiagrams] = useState<DiagramWithSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingToSection, setAddingToSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    description: '',
    order_index: 0,
  });

  useEffect(() => {
    if (!profile?.is_admin) {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [profile]);

  const loadData = async () => {
    try {
      const { data: sectionsData } = await supabase
        .from('course_sections')
        .select('*')
        .order('order_index', { ascending: true });

      const { data: diagramsData } = await supabase
        .from('section_diagrams')
        .select('*')
        .order('order_index', { ascending: true });

      if (sectionsData) {
        setSections(sectionsData);
      }

      if (diagramsData && sectionsData) {
        const enrichedDiagrams = diagramsData.map(d => ({
          ...d,
          section_title: sectionsData.find(s => s.id === d.section_id)?.title,
        }));
        setDiagrams(enrichedDiagrams);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (sectionId: string) => {
    setAddingToSection(sectionId);
    setEditingId(null);
    setFormData({
      title: '',
      image_url: '',
      description: '',
      order_index: diagrams.filter(d => d.section_id === sectionId).length,
    });
  };

  const handleEdit = (diagram: SectionDiagram) => {
    setEditingId(diagram.id);
    setAddingToSection(null);
    setFormData({
      title: diagram.title,
      image_url: diagram.image_url,
      description: diagram.description || '',
      order_index: diagram.order_index,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setAddingToSection(null);
    setFormData({ title: '', image_url: '', description: '', order_index: 0 });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) {
      alert('Title and Image URL are required');
      return;
    }

    try {
      if (editingId) {
        await supabase
          .from('section_diagrams')
          .update({
            title: formData.title,
            image_url: formData.image_url,
            description: formData.description || null,
            order_index: formData.order_index,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
      } else if (addingToSection) {
        await supabase.from('section_diagrams').insert([
          {
            section_id: addingToSection,
            title: formData.title,
            image_url: formData.image_url,
            description: formData.description || null,
            order_index: formData.order_index,
          },
        ]);
      }

      handleCancel();
      loadData();
    } catch (error) {
      console.error('Error saving diagram:', error);
      alert('Failed to save diagram');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this diagram?')) return;

    try {
      await supabase.from('section_diagrams').delete().eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error deleting diagram:', error);
      alert('Failed to delete diagram');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Diagram Manager</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to Add Images</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Upload your image to a hosting service (Imgur, GitHub, Google Drive, etc.)</li>
            <li>Get a direct image URL (must end in .jpg, .png, .gif, or .svg)</li>
            <li>For Google Drive: Right-click image → Get link → Set to "Anyone with link can view"</li>
            <li>Use format: https://drive.google.com/uc?id=FILE_ID</li>
          </ol>
        </div>

        {sections.map((section) => {
          const sectionDiagrams = diagrams.filter((d) => d.section_id === section.id);
          const isAdding = addingToSection === section.id;

          return (
            <div key={section.id} className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <button
                  onClick={() => handleAdd(section.id)}
                  disabled={isAdding}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Diagram
                </button>
              </div>

              <div className="p-6">
                {isAdding && (
                  <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Add New Diagram</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Disaggregation Architecture Diagram"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/image.png"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Optional description or caption"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={formData.order_index}
                          onChange={(e) =>
                            setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="0"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                          <Save className="w-4 h-4" />
                          Save Diagram
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {sectionDiagrams.length === 0 && !isAdding ? (
                  <p className="text-gray-500 text-center py-8">
                    No diagrams added yet. Click "Add Diagram" to get started.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sectionDiagrams.map((diagram) => {
                      const isEditing = editingId === diagram.id;

                      return (
                        <div
                          key={diagram.id}
                          className={`border rounded-lg overflow-hidden ${
                            isEditing ? 'border-blue-600 border-2' : 'border-gray-300'
                          }`}
                        >
                          {isEditing ? (
                            <div className="p-6 bg-blue-50">
                              <h3 className="font-semibold text-gray-900 mb-4">Edit Diagram</h3>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                      setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL *
                                  </label>
                                  <input
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) =>
                                      setFormData({ ...formData, image_url: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                  </label>
                                  <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                      setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Order
                                  </label>
                                  <input
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        order_index: parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="0"
                                  />
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-1">
                                    {diagram.title}
                                  </h3>
                                  {diagram.description && (
                                    <p className="text-sm text-gray-600">{diagram.description}</p>
                                  )}
                                  <p className="text-xs text-gray-500 mt-1">
                                    Order: {diagram.order_index}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEdit(diagram)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(diagram.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="bg-gray-100 rounded-lg p-4">
                                <img
                                  src={diagram.image_url}
                                  alt={diagram.title}
                                  className="max-w-full h-auto rounded"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling!.classList.remove('hidden');
                                  }}
                                />
                                <div className="hidden text-center text-red-600 py-8">
                                  Failed to load image. Please check the URL.
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-2 break-all">
                                URL: {diagram.image_url}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
