'use client';
import { useState } from 'react';

export default function MainApp() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendToSiraj = async () => {
    setLoading(true);
    setOutput('جاري المعالجة...');
    const res = await fetch('/api/bridge/orchestrator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'chat', data: { text: input } })
    });
    const data = await res.json();
    setOutput(data.data || data.error);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h1>رافد - المساعد الذكي</h1>
      <textarea 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="اكتب سؤالك هنا..."
        rows={4}
        style={{ width: '100%', padding: 10 }}
      />
      <button 
        onClick={sendToSiraj} 
        disabled={loading}
        style={{ marginTop: 10, padding: '10px 20px' }}
      >
        {loading ? '...' : 'ارسال'}
      </button>
      <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
        <b>الرد:</b> {output}
      </div>
    </div>
  );
}