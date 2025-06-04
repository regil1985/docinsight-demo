'use client';

import { useState } from 'react';
import queryVectara from '../lib/queryVectara';

export default function QueryForm() {
    const [question, setQuestion] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponses([]);
        setSummary('');

        try {
            const result = await queryVectara(question);
            console.log('Vectara response:', result);

            if (result.summary) {
                setSummary(result.summary.trim());
            }

            const searchResults = result.search_results || [];
            const formatted = searchResults.map((res: any) => {
                const text = res.text?.trim() || '';
                const source = res.document_id || 'Unknown document';
                const score = res.score ? res.score.toFixed(3) : 'N/A';

                return `${text}|||${source}|||${score}`;
            });



            setResponses(formatted.length ? formatted : ['No results found.']);
        } catch (error) {
            console.error('Error:', error);
            setResponses(['Error fetching response.']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10 font-sans">
            {/* Title */}
            <h1 className="text-center text-4xl font-extrabold text-blue-600 mb-2">
                DocInsight
            </h1>
            <p className="text-center text-lg mb-6">
                Enter your query to get insights about the documents.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your query here..."
                        className="w-full sm:flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {loading ? 'Searching...' : 'Submit'}
                    </button>
                </div>
            </form>

            {/* Summary */}
            {summary && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 max-w-4xl mx-auto mb-6 rounded">
                    <h2 className="text-xl font-semibold mb-2">🧠 Generated Summary</h2>
                    <p className="whitespace-pre-wrap">{summary}</p>
                </div>
            )}

            {/* Results */}
            {responses.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-md p-4 max-w-4xl mx-auto space-y-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">📄 Relevant Extracts</h2>
                    {responses.map((res, i) => {
                        const [textPart, sourcePart, scorePart] = res.split('|||');
                        return (
                            <div
                                key={i}
                                className="p-4 bg-white border border-gray-300 rounded shadow-sm space-y-2"
                            >
                                <p className="text-gray-800 whitespace-pre-wrap">{textPart}</p>
                                <div className="text-sm text-gray-500 pt-2 border-t border-gray-200">
                                    <p><span className="font-semibold text-gray-600">Source:</span> {sourcePart}</p>
                                    <p><span className="font-semibold text-gray-600">Confidence Score:</span> <span className="text-blue-600 font-bold">{scorePart}</span></p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            )}
        </div>
    );
}

