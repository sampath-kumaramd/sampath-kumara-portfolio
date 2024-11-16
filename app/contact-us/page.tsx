'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Code2,
  SendHorizontal,
} from 'lucide-react';
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
import { event } from '@/lib/analytics';

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
      event({
        action: 'contact_form_submit',
        category: 'engagement',
        label: 'Contact Form Submission',
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
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-background dark:via-background/95 dark:to-background/90">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto my-8 px-4 md:my-16 md:px-8"
      >
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16">
          <div className="absolute -left-4 top-0 h-32 w-32 rounded-full bg-Secondary/5 blur-3xl md:h-64 md:w-64"></div>
          <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-Secondary/10 blur-3xl md:h-64 md:w-64"></div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="col-span-1 grid justify-start lg:col-span-2"
          >
            <div className="mb-4 flex items-center space-x-2 md:mb-8">
              <Code2 className="h-6 w-6 text-Secondary md:h-8 md:w-8" />
              <p className="text-3xl font-bold text-Secondary md:text-4xl lg:text-6xl">
                Let&apos;s chat.
              </p>
            </div>

            <div className="text-2xl font-bold text-fontPrimary dark:text-gray-200 md:text-3xl lg:text-4xl">
              Tell me about your <br className="hidden md:block" /> project.
            </div>
            <p className="py-3 text-lg text-bgSecondery dark:text-gray-300 md:py-5 md:text-xl">
              Let&apos;s create something together ✌️
            </p>

            <div className="mt-4 space-y-3 md:mt-8 md:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 rounded-lg border border-transparent bg-white/5 p-3 text-sm text-fontPrimary transition-all duration-300 hover:border-Secondary/20 hover:bg-Secondary/5 hover:text-Secondary dark:bg-gray-900/30 md:p-4 md:text-base"
                >
                  <info.icon className="h-5 w-5 text-Secondary md:h-6 md:w-6" />
                  <span className="font-medium">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="col-span-1 lg:col-span-3 lg:ms-16"
          >
            <div className="relative col-span-2 grid rounded-2xl border border-gray-200/20 bg-white/5 p-4 backdrop-blur-sm dark:bg-gray-900/30 md:p-8">
              <h2 className="mb-8 flex items-center space-x-3 text-2xl font-bold text-Secondary md:mb-16 md:text-3xl">
                <SendHorizontal className="h-6 w-6 md:h-8 md:w-8" />
                <span>Send me a message 🚀</span>
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
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
                    className="group relative w-full overflow-hidden rounded-lg bg-Secondary px-6 py-2.5 text-sm text-white transition-all hover:bg-Secondary/90 hover:shadow-lg dark:text-gray-200 md:px-8 md:py-3 md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{isLoading ? 'Sending...' : 'Send message'}</span>
                      <SendHorizontal className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
                    </span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-Secondary via-Secondary/80 to-Secondary opacity-0 transition-opacity group-hover:opacity-100"></div>
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
