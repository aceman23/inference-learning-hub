import React, { useEffect, useState } from 'react';
import { supabase, SectionDiagram } from '../lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

interface SectionDiagramsProps {
  sectionId: string;
}

export const SectionDiagrams: React.FC<SectionDiagramsProps> = ({ sectionId }) => {
  const [diagrams, setDiagrams] = useState<SectionDiagram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiagrams();
  }, [sectionId]);

  const loadDiagrams = async () => {
    try {
      const { data } = await supabase
        .from('section_diagrams')
        .select('*')
        .eq('section_id', sectionId)
        .order('order_index', { ascending: true });

      if (data) {
        setDiagrams(data);
      }
    } catch (error) {
      console.error('Error loading diagrams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (diagrams.length === 0) {
    return null;
  }

  return (
    <div className="my-8 space-y-6">
      {diagrams.map((diagram) => (
        <div key={diagram.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{diagram.title}</h3>
          </div>
          {diagram.description && (
            <p className="text-gray-600 mb-4">{diagram.description}</p>
          )}
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <img
              src={diagram.image_url}
              alt={diagram.title}
              className="max-w-full h-auto mx-auto rounded"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const errorDiv = target.nextElementSibling as HTMLElement;
                if (errorDiv) {
                  errorDiv.classList.remove('hidden');
                }
              }}
            />
            <div className="hidden text-center text-red-600 py-8 text-sm">
              <p>Failed to load diagram. The image URL may be incorrect or inaccessible.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
