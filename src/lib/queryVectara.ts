import axios from 'axios';

export default async function queryVectara(query: string) {
  const response = await axios.post(
    'https://api.vectara.io/v2/query',
    {
      query,
      search: {
        corpora: [
          {
            corpus_key: 'srp_docs',
            lexical_interpolation: 0.005,
            metadata_filter: '',
            custom_dimensions: {},
          },
        ],
        offset: 0,
        limit: 10,
        context_configuration: {
          sentences_before: 2,
          sentences_after: 2,
          start_tag: '%START_SNIPPET%',
          end_tag: '%END_SNIPPET%',
        },
        reranker: {
          type: 'customer_reranker',
          reranker_id: 'rnk_272725719',
        },
      },
      generation: {
        max_used_search_results: 5,
        response_language: 'eng',
        enable_factual_consistency_score: true,
      },
      stream_response: false,
      save_history: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'customer-id': process.env.NEXT_PUBLIC_VECTARA_CUSTOMER_ID!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VECTARA_API_KEY!}`,
      },
    }
  );

  return response.data;
}