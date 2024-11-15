'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
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
  message: z.string().min(10, {
    message: 'Message must be at least 30 characters.',
  }),
});

export default function ContactForm() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
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
    <div className="container mx-auto my-16 pt-8">
      <div className="grid grid-cols-5 gap-16">
        <div className="col-span-2 grid justify-start">
          <p className="text-6xl font-bold text-fontSecondary">
            Let&apos;s chat.
          </p>
          <div className="text-4xl font-bold text-fontPrimary">
            Tell me about your <br /> project.
          </div>
          <p className="py-5 text-xl text-bgSecondery">
            Let&apos;s create something together ✌️
          </p>
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              className="flex items-center space-x-4 text-fontPrimary transition-colors duration-300 hover:text-fontSecondary"
            >
              <info.icon className="h-6 w-6 text-fontSecondary" />
              <span>{info.text}</span>
            </a>
          ))}
        </div>
        <div className="col-span-3 ms-16">
          <div className="col-span-2 grid">
            <h2 className="mb-16 text-3xl font-bold text-fontSecondary">
              Send me a message 🚀
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Firstname"
                            {...field}
                            className="opacity-70"
                            required
                          />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="Lastname"
                            {...field}
                            className="text-bgPrimary opacity-70"
                            required
                          />
                        </FormControl>
                        <FormMessage />
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
                          className="text-bgPrimary opacity-70"
                          required
                        />
                      </FormControl>
                      <FormMessage />
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
                          className="text-bgPrimary opacity-70"
                        />
                      </FormControl>
                      <FormMessage />
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
                          className="text-bgPrimary opacity-70"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="rounded-full bg-fontSecondary hover:bg-green-600"
                >
                  Send message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
