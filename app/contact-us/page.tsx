'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().regex(/^\+?[0-9]\d{1,14}$/, {
    message: 'Please enter a valid phone number.',
  }),
  service: z.string({
    required_error: 'Please select a service.',
  }),
  message: z.string().min(5, {
    message: 'Message must be at least 5 characters.',
  }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      service: '',
      message: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setIsLoading(false);
      form.reset();
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully.',
        variant: 'default',
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      text: '(+46) 321 654 876',
      href: 'tel:+46321654876',
    },
    {
      icon: Mail,
      text: 'youremail@email.com',
      href: 'mailto:youremail@email.com',
    },
    {
      icon: MapPin,
      text: 'Code Corner, Tech Town 13579',
      href: 'https://maps.google.com/?q=Code+Corner,+Tech+Town+13579',
    },
    {
      icon: MessageCircle,
      text: 'sampathkumaramd#1234',
      href: 'https://discord.com/users/YourDiscordUserID',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col justify-center dark:bg-background dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto my-16 pt-8"
      >
        <div className="grid grid-cols-5 gap-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="col-span-2 grid justify-start"
          >
            <p className="text-6xl font-bold text-Secondary">
              Let&apos;s chat.
            </p>
            <div className="text-4xl font-bold text-fontPrimary dark:text-gray-200">
              Tell me about your <br /> project.
            </div>
            <p className="py-5 text-xl text-bgSecondery dark:text-gray-300">
              Let&apos;s create something together ✌️
            </p>
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="flex items-center space-x-4 text-fontPrimary transition-colors duration-300 hover:text-Secondary dark:text-gray-200 dark:hover:text-Secondary"
              >
                <info.icon className="h-6 w-6 text-Secondary" />
                <span>{info.text}</span>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="col-span-3 ms-16"
          >
            <div className="col-span-2 grid">
              <h2 className="mb-16 text-3xl font-bold text-Secondary">
                Send me a message 🚀
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="First name"
                              {...field}
                              className="rounded-lg border-gray-300 bg-white/5 text-fontPrimary placeholder:text-gray-400 dark:bg-gray-500/5 dark:text-gray-200 dark:placeholder:text-gray-400"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Last name"
                              {...field}
                              className="rounded-lg border-gray-300 bg-white/5 text-fontPrimary placeholder:text-gray-400 dark:bg-gray-500/5 dark:text-gray-200 dark:placeholder:text-gray-400"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email address"
                            {...field}
                            className="rounded-lg border-gray-300 bg-white/5 text-fontPrimary placeholder:text-gray-400 dark:bg-gray-500/5 dark:text-gray-200 dark:placeholder:text-gray-400"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Phone number"
                            {...field}
                            className="rounded-lg border-gray-300 bg-white/5 text-fontPrimary placeholder:text-gray-400 dark:bg-gray-500/5 dark:text-gray-200 dark:placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here."
                            {...field}
                            className="min-h-[120px] rounded-lg border-gray-300 bg-white/5 text-fontPrimary placeholder:text-gray-400 hover:right-0 focus:ring-0 dark:bg-gray-500/5 dark:text-gray-200 dark:placeholder:text-gray-400"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    className="rounded-full bg-Secondary px-8 py-3 text-white transition-all hover:bg-Secondary/80 hover:shadow-lg dark:text-gray-200 dark:hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? 'Sending...' : 'Send message'}
                  </motion.button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
