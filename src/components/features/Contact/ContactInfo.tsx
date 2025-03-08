'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';
import { Icon } from '@iconify/react';

const contacts = [
  { icon: 'mdi:phone', text: '0824.034.909' },
  { icon: 'mdi:email', text: 'volonglqd@gmail.com' },
  { icon: 'mdi:linkedin', text: 'linkedin.com/in/phi-long-uit' },
  { icon: 'mdi:github', text: 'github.com/slogvo' },
];

export default function ContactCard() {
  return (
    <Card className="mx-auto p-6 shadow-md bg-transparent border-none">
      <CardContent className="flex items-center justify-between space-x-6 flex-wrap">
        {contacts.map(({ icon, text }, index) => (
          <ContactItem key={index} icon={icon} text={text} />
        ))}
      </CardContent>
    </Card>
  );
}

function ContactItem({ icon, text }: { icon: string; text: ReactNode }) {
  return (
    <div className="flex items-center space-x-3 text-white">
      <Icon icon={icon} className="text-2xl" />
      <span>{text}</span>
    </div>
  );
}
