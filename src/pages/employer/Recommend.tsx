import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRecommendationStore } from '../../store/recommendationStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Share2, Send, Award, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Recommend() {
  const { user } = useAuthStore();
  const { sendRecommendation, stats, loading } = useRecommendationStore();
  const [formData, setFormData] = React.useState({
    companyName: '',
    recipientName: '',
    recipientEmail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await sendRecommendation(
        user.id,
        formData.companyName,
        formData.recipientName,
        formData.recipientEmail
      );
      toast.success('Empfehlung erfolgreich versendet!');
      setFormData({ companyName: '', recipientName: '', recipientEmail: '' });
    } catch (error) {
      toast.error('Fehler beim Versenden der Empfehlung');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary-400 rounded-full mx-auto flex items-center justify-center">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hi, du bist begeistert von VILOCAR?
        </h1>
        <p className="text-xl text-gray-600">
          Dann hilf uns, anderen zu helfen und empfehle uns weiter.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Gesendete Einladungen</p>
              <p className="text-2xl font-semibold">{stats.totalSent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Akzeptierte Einladungen</p>
              <p className="text-2xl font-semibold">{stats.accepted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Akzeptanzrate</p>
              <p className="text-2xl font-semibold">
                {stats.acceptanceRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Form */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name des Unternehmens"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="z.B. Musterfirma GmbH"
            required
          />

          <Input
            label="Name des Ansprechpartners"
            value={formData.recipientName}
            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            placeholder="z.B. Max Mustermann"
            required
          />

          <Input
            type="email"
            label="E-Mail-Adresse"
            value={formData.recipientEmail}
            onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
            placeholder="kontakt@musterfirma.de"
            required
          />

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-3"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Wird gesendet...' : 'Einladung senden'}
          </Button>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <p className="text-blue-800 text-sm">
          Nach dem Versand der Empfehlung erhält das Unternehmen eine E-Mail mit allen wichtigen 
          Informationen und einem personalisierten Registrierungslink. Sie können den Status 
          Ihrer Empfehlungen jederzeit hier einsehen.
        </p>
      </div>
    </div>
  );
}