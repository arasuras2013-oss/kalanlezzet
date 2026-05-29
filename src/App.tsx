import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);

    // Grok API call will be here
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-4.3',
        messages: [
          { role: 'system', content: 'Sen sadece yemek tarifleri konusunda yardımcı olan bir AI asistanısın. Yemek dışı hiçbir konuda konuşma. Kullanıcı Türkçe veya İngilizce sorabilir.' },
          { role: 'user', content: `Bu malzemelerle ne yapabilirim? Malzemeler: ${ingredients}. Detaylı tarif ver, Türkçe cevap ver.` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    setRecipes([data.choices[0].message.content]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <nav className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🌿</div>
            <h1 className="text-3xl font-bold text-orange-600">KalanLezzet</h1>
          </div>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')} className="px-4 py-2 bg-orange-500 text-white rounded-full">
            {i18n.language === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-orange-800 mb-4">Kalan Malzemelerle Lezzet Yarat!</h2>
          <p className="text-xl text-orange-700">Malzemelerini yaz, Grok sana özel tarif çıkarsın 🍳</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Örnek: tavuk göğsü, patates, soğan, sarımsak, domates..."
            className="w-full h-40 p-6 border border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 text-lg"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-2xl text-xl font-semibold hover:brightness-110 transition"
          >
            {loading ? 'Grok Düşünüyor...' : 'Tarif Önerisi Al 👨‍🍳'}
          </button>
        </div>

        {recipes.length > 0 && (
          <div className="space-y-8">
            {recipes.map((recipe, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl p-10 prose prose-orange max-w-none">
                {recipe}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;