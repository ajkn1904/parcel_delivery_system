"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Globe, Mail, Phone } from "lucide-react";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export default function Contact({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(+123) 34567890",
  email = "parcelgo@email.com",
  web = { label: "parcelgo.com", url: "/" },
}: Contact2Props) {
  const [loading, setLoading] = useState(false);

  const [formName, setFormName] = useState("Example");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("Parcel request");
  const [formMessage, setFormMessage] = useState(
    "How to create a parcel request?"
  );

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formEmail.trim()) {
      setError("Email is required");
      return;
    }

    const toastId = toast.loading("Sending message...!");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Message Sent. We’ll get back to you as soon as possible.", {
        id: toastId,
      });

      // ✅ After submit, clear values → placeholders will show
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    }, 2000);
  };

  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-10 uppercase">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Reach Us
              </h3>
              <ul className="ml-4 list-disc">
                <li className="flex items-center gap-3">
                  <Phone className="text-orange-500" />
                  <span>{phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-orange-500" />
                  <a href={`mailto:${email}`} className="underline text-blue-500">
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="text-orange-500" />
                  <a href={web.url} target="_self" className="underline text-blue-500">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-96 max-w-3xl flex-col gap-6 rounded-lg p-10 border border-muted bg-gray-50 dark:bg-gray-900"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                className="bg-white dark:bg-black dark:hover:bg-black"
                type="text"
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-white dark:bg-black dark:hover:bg-black"
                type="email"
                id="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}

              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                className="bg-white dark:bg-black dark:hover:bg-black"
                type="text"
                id="subject"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="bg-white dark:bg-black dark:hover:bg-black"
                id="message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Enter your message"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-background dark:text-foreground uppercase"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
