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
  lastName: z.string().optional(),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().optional(),
  service: z.string().optional(),
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
      text: '(+94) 76 093 7443',
      href: 'tel:+94760937443',
    },
    {
      icon: Mail,
      text: 'mdskumara.info@gmail.com',
      href: 'mailto:mdskumara.info@gmail.com',
    },
    {
      icon: MapPin,
      text: 'Moratuwa, Sri Lanka',
      href: 'https://maps.google.com/?q=Moratuwa,+Sri+Lanka',
    },
    {
      icon: MessageCircle,
      text: 'sampath_kumara',
      href: 'https://discord.com/users/sampath_kumara',
    },
  ];

  return (
    <div className="flex flex-col justify-center bg-[#1e1e1e] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="my-16 px-4 pt-20 md:my-16"
      >
        {/* VS Code Tab Bar */}
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="col-span-1 grid justify-start lg:col-span-2"
          >
            <div className="mb-4 flex items-center space-x-2 md:mb-8">
              <Code2 className="h-6 w-6 text-[#007acc] md:h-8 md:w-8" />
              <p className="text-3xl font-bold text-[#007acc] md:text-4xl lg:text-6xl">
                Let&apos;s connect.
              </p>
            </div>

            <div className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              I&apos;d love to hear <br className="hidden md:block" /> from you!
            </div>
            <p className="py-3 text-lg text-gray-300 md:py-5 md:text-xl">
              Whether it&apos;s a project idea, question, or just to say hello -
              I&apos;m always open to connecting with like-minded people ✌️
            </p>

            <div className="mt-4 space-y-3 md:mt-8 md:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 rounded-lg border border-[#333333] bg-[#252526] p-3 text-sm text-white transition-all duration-300 hover:border-[#007acc]/20 hover:bg-[#2d2d2d] md:p-4 md:text-base"
                >
                  <info.icon className="h-5 w-5 text-[#007acc] md:h-6 md:w-6" />
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
            <div className="relative col-span-2 grid rounded-lg border border-[#333333] bg-[#252526] p-4 backdrop-blur-sm md:p-8">
              <h2 className="mb-8 flex items-center space-x-3 text-2xl font-bold text-[#007acc] md:mb-16 md:text-3xl">
                <SendHorizontal className="h-6 w-6 md:h-8 md:w-8" />
                <span>Reach out anytime 🚀</span>
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
                              className="rounded border-[#3c3c3c] bg-[#3c3c3c] text-white placeholder:text-gray-400"
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
                              className="rounded border-[#3c3c3c] bg-[#3c3c3c] text-white placeholder:text-gray-400"
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
                            className="rounded border-[#3c3c3c] bg-[#3c3c3c] text-white placeholder:text-gray-400"
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
                            className="rounded border-[#3c3c3c] bg-[#3c3c3c] text-white placeholder:text-gray-400"
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
                            className="min-h-[120px] rounded border-[#3c3c3c] bg-[#3c3c3c] text-white placeholder:text-gray-400 hover:right-0 focus:ring-0"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded bg-[#007acc] px-6 py-2.5 text-sm text-white transition-all hover:bg-[#007acc]/90 md:px-8 md:py-3 md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>
                        {isLoading ? 'Sending...' : 'Connect with me'}
                      </span>
                      <SendHorizontal className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
                    </span>
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
