import { Product } from '@/sanity.types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProductDescription = ({ markdown }:{markdown:string}) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <ReactMarkdown 
        children={markdown} 
        remarkPlugins={[remarkGfm]} 
        className="prose lg:prose-xl text-gray-800"
      />
    </div>
  );
};

export default ProductDescription;
