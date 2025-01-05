import React from 'react';
import { useFAQStore } from '../../store/faqStore';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2, MoveUp, MoveDown } from 'lucide-react';
import type { FAQ, FAQVisibility } from '../../types/faq';

export function FAQManagement() {
  const {
    faqs,
    categories,
    loading,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useFAQStore();

  const [isAddingFAQ, setIsAddingFAQ] = React.useState(false);
  const [editingFAQ, setEditingFAQ] = React.useState<FAQ | null>(null);
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const handleAddFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await addFAQ({
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      visibility: formData.get('visibility') as FAQVisibility,
      category: formData.get('category') as string,
      order: faqs.length,
    });
    
    setIsAddingFAQ(false);
  };

  const handleUpdateFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingFAQ) return;

    const formData = new FormData(e.currentTarget);
    
    await updateFAQ(editingFAQ.id, {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      visibility: formData.get('visibility') as FAQVisibility,
      category: formData.get('category') as string,
    });
    
    setEditingFAQ(null);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    await addCategory(newCategoryName);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">FAQ Verwaltung</h1>
        <div className="space-x-4">
          <Button onClick={() => setIsAddingCategory(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Kategorie hinzufügen
          </Button>
          <Button onClick={() => setIsAddingFAQ(true)}>
            <Plus className="w-4 h-4 mr-2" />
            FAQ hinzufügen
          </Button>
        </div>
      </div>

      {/* Category Management */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Kategorien</h2>
        <div className="grid gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
            >
              <span className="font-medium">{category.name}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newName = prompt('Neuer Kategoriename:', category.name);
                    if (newName) updateCategory(category.id, newName);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm('Kategorie wirklich löschen?')) {
                      deleteCategory(category.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <div className="grid gap-4">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-sm text-gray-500">
                    Sichtbar für: {faq.visibility === 'all' ? 'Alle' : faq.visibility === 'broker' ? 'Makler' : 'Mitglieder'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingFAQ(faq)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('FAQ wirklich löschen?')) {
                        deleteFAQ(faq.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit FAQ Dialog */}
      {(isAddingFAQ || editingFAQ) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingFAQ ? 'FAQ bearbeiten' : 'Neue FAQ hinzufügen'}
            </h2>
            <form onSubmit={editingFAQ ? handleUpdateFAQ : handleAddFAQ} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Frage</label>
                <input
                  name="question"
                  defaultValue={editingFAQ?.question}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Antwort</label>
                <textarea
                  name="answer"
                  defaultValue={editingFAQ?.answer}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kategorie</label>
                <select
                  name="category"
                  defaultValue={editingFAQ?.category}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sichtbarkeit</label>
                <select
                  name="visibility"
                  defaultValue={editingFAQ?.visibility}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  required
                >
                  <option value="all">Alle</option>
                  <option value="broker">Nur Makler</option>
                  <option value="member">Nur Mitglieder</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingFAQ(false);
                    setEditingFAQ(null);
                  }}
                >
                  Abbrechen
                </Button>
                <Button type="submit">
                  {editingFAQ ? 'Speichern' : 'Hinzufügen'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Dialog */}
      {isAddingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Neue Kategorie</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingCategory(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit">Hinzufügen</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}