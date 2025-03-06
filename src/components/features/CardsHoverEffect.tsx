import Image from 'next/image';
import React from 'react';

// Card data with light gradients
const cardData = [
  {
    id: 1,
    tag: {
      text: 'React',
      defaultBg: 'bg-blue-100',
      hoverBg: 'bg-blue-500',
      defaultText: 'text-blue-800',
      hoverText: 'text-white',
    },
    title: '📽 React Universal Video',
    hoverTitle: '📽 Flexible Video Player',
    description:
      'Tích hợp phát video từ YouTube, HLS, và HTML5 một cách liền mạch. Dễ sử dụng, hỗ trợ tùy chỉnh cao và tối ưu hiệu suất.',
    gradient: {
      default:
        'bg-gradient-to-t from-white/20 to-gray-50/50 rounded-2xl shadow-lg backdrop-blur-xs',
      hover: 'hover:from-blue-100/80 hover:to-blue-50/50',
    },
    border: 'border-blue-100',
    textColor: {
      title: 'text-slate-800',
      description: 'text-slate-600',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1739932900241-4d3362b5ed8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
  },
  {
    id: 2,
    tag: {
      text: 'Vue',
      defaultBg: 'bg-green-100',
      hoverBg: 'bg-green-500',
      defaultText: 'text-green-800',
      hoverText: 'text-white',
    },
    title: '🧩Formsible Element',
    hoverTitle: '🧩 Xây dựng biểu mẫu dễ dàng',
    description:
      'Cung cấp các thành phần nhẹ, dễ tùy chỉnh, hỗ trợ tích hợp Codemirror, Google Maps và PayPal Checkout. Tương thích hoàn toàn với Vue 3.',
    gradient: {
      default:
        'bg-gradient-to-t from-white/20 to-gray-50/50 rounded-2xl shadow-lg backdrop-blur-xs',
      hover: 'hover:from-green-100/80 hover:to-green-50/50',
    },
    border: 'border-green-100',
    textColor: {
      title: 'text-slate-800',
      description: 'text-slate-600',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1739932900241-4d3362b5ed8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
  },
  {
    id: 3,
    tag: {
      text: 'React',
      defaultBg: 'bg-red-100',
      hoverBg: 'bg-red-500',
      defaultText: 'text-red-800',
      hoverText: 'text-white',
    },
    title: '📖 React Notion Blocks',
    hoverTitle: '📖 Render Notion Content in React',
    description:
      'Dễ dàng hiển thị nội dung từ Notion trong ứng dụng React với API đơn giản, hỗ trợ đầy đủ các block Notion.',
    gradient: {
      default:
        'bg-gradient-to-t from-white/20 to-gray-50/50 rounded-2xl shadow-lg backdrop-blur-xs',
      hover: 'hover:from-red-100/80 hover:to-red-50/50',
    },
    border: 'border-red-100',
    textColor: {
      title: 'text-slate-800',
      description: 'text-slate-600',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1739932900241-4d3362b5ed8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
  },
];

// Define the interface for card data
interface CardData {
  id: number;
  tag: {
    text: string;
    defaultBg: string;
    hoverBg: string;
    defaultText: string;
    hoverText: string;
  };
  title: string;
  hoverTitle: string;
  description: string;
  gradient: {
    default: string;
    hover: string;
  };
  border: string;
  textColor: {
    title: string;
    description: string;
  };
  imageSrc: string;
}

// Card component with light gradients
const Card = ({ data }: { data: CardData }) => {
  const {
    tag,
    title,
    hoverTitle,
    description,
    gradient,
    border,
    textColor,
    imageSrc,
  } = data;

  return (
    <div
      className={`group ${gradient.default} ${gradient.hover} relative rounded-2xl border ${border} shadow-sm before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-5 transition-all duration-300`}
    >
      <div className="relative">
        <div className="px-6 py-5">
          <div
            className={`${tag.defaultBg} group-hover:${tag.hoverBg} ${tag.defaultText} group-hover:${tag.hoverText} transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 mb-1`}
          >
            {tag.text}
          </div>
          <span
            className={`text-lg group-hover:hidden inline-block font-semibold ${textColor.title} mb-1 transition-all duration-500 ease-in-out`}
          >
            {title}
          </span>
          <span
            className={`text-lg group-hover:inline-block hidden font-semibold ${textColor.title} mb-1 transition-all duration-500 ease-in-out`}
          >
            {hoverTitle}
          </span>
          <p className={`text-sm text-justify ${textColor.description}`}>
            {description}
          </p>
        </div>
        <div className="relative group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
          <Image
            className="group-hover:opacity-0 transition-opacity duration-500 object-cover h-full m-0 p-0 rounded-b-xl"
            src={imageSrc}
            width={350}
            height={240}
            alt="Card image"
          />
          <Image
            className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity object-cover duration-300 h-full m-0 p-0 rounded-b-xl"
            src={imageSrc}
            width={350}
            height={240}
            alt="Card image displaying on hover"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

function CardHoverEffect() {
  return (
    <section className="grid md:grid-cols-3 gap-6 max-md:max-w-xs mx-auto">
      {cardData.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </section>
  );
}

export default CardHoverEffect;
