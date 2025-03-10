'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReactNode, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

const DB_API_ENDPOINT =
  process.env.DB_API_ENDPOINT || 'https://blog-express-jf74.onrender.com/api';

// Schema validation với Yup
const schema = yup.object().shape({
  name: yup.string().trim().required('Tên không được để trống.'),
  email: yup
    .string()
    .email('Email không hợp lệ.')
    .required('Email không được để trống.'),
  message: yup.string().trim().required('Lời nhắn không được để trống.'),
});

const contacts: {
  icon: string;
  text: string;
  action: (() => void) | 'openEmailModal';
}[] = [
  {
    icon: 'mdi:phone',
    text: 'Liên hệ: 0824.034.909',
    action: () => (window.location.href = 'tel:0824034909'),
  },
  { icon: 'mdi:email', text: 'Liên hệ email', action: 'openEmailModal' },
  {
    icon: 'mdi:linkedin',
    text: 'Kết nối LinkedIn',
    action: () => window.open('https://linkedin.com/in/phi-long-uit', '_blank'),
  },
  {
    icon: 'mdi:github',
    text: 'Theo dõi GitHub',
    action: () => window.open('https://github.com/slogvo', '_blank'),
  },
];

export default function ContactCard() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { name: 'Người lạ ơi', email: '', message: '' },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    // Show toast loading and save the ID
    const toastId = toast.loading('Đang gửi...');

    try {
      const res = await fetch(`${DB_API_ENDPOINT}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Success: Update toast loading to success
        toast.success('Tin nhắn đã được gửi thành công!', {
          id: toastId, // Using ID to replace toast loading
          description: 'Cảm ơn bạn, tôi sẽ phản hồi sớm nhất! 🎉',
          duration: 3000,
        });
        reset(); // Reset form
        setIsEmailModalOpen(false);
      } else {
        // Failed Submit
        toast.error('Gửi tin nhắn thất bại.', {
          id: toastId, // Using ID to replace toast loading
          description: 'Vui lòng thử lại sau!',
          duration: 3000,
        });
      }
    } catch (error) {
      // Error: Update toast loading to error
      toast.error('Có lỗi xảy ra!', {
        id: toastId, // Using ID to replace toast loading
        description: (error as Error).message,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Image
        alt="Vo Dang Phi Long"
        src="/images/avatar.png"
        width={400}
        height={400}
        className="object-cover flex-1 w-[400px]"
      />
      <Card className="mx-auto mt-20 p-6 flex-1 shadow-md bg-transparent border-none">
        <CardContent className="flex flex-col items-start justify-between gap-y-4">
          {contacts.map(({ icon, text, action }, index) => (
            <ContactItem
              key={index}
              icon={icon}
              text={text}
              onClick={() =>
                action === 'openEmailModal'
                  ? setIsEmailModalOpen(true)
                  : action()
              }
            />
          ))}
        </CardContent>
      </Card>

      {/* Dialog gửi email */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="mx-auto w-[calc(100%-24px)] sm:max-w-[425px] p-4 px-6 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Kết nối với tôi</DialogTitle>
            <DialogDescription>
              Hãy để lại thông tin và lời nhắn, tôi sẽ phản hồi trong thời gian
              sớm nhất!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Input Tên */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Tên
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    {...register('name')}
                    className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Input Email */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <div className="col-span-3">
                  <Input
                    id="email"
                    {...register('email')}
                    className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Input Lời nhắn */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-left">
                  Lời nhắn
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="message"
                    {...register('message')}
                    className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isValid}>
                Gửi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactItem({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center space-x-3 text-white group hover:text-primary cursor-pointer"
      onClick={onClick}
    >
      <Icon icon={icon} className="text-2xl" />
      <span>{text}</span>
    </div>
  );
}
