"use client";

import { useState } from "react";

export default function GetStarted() {
  const [form, setForm] = useState({
    district_name: "",
    contact_name: "",
    email: "",
    role: ""
  });

  async function submit() {
    await fetch("/api/pilot-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Request submitted");
  }

  return (
    <main className="min-h-screen p-10 bg-[#f8f7f4]">
      <h1 className="text-4xl font-bold mb-6">
        Start District Pilot
      </h1>

      <div className="space-y-4 max-w-xl">
        <input placeholder="District Name"
          onChange={(e)=>setForm({...form, district_name:e.target.value})}
          className="w-full p-3 border" />

        <input placeholder="Your Name"
          onChange={(e)=>setForm({...form, contact_name:e.target.value})}
          className="w-full p-3 border" />

        <input placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})}
          className="w-full p-3 border" />

        <input placeholder="Role (Superintendent, CAO, etc.)"
          onChange={(e)=>setForm({...form, role:e.target.value})}
          className="w-full p-3 border" />

        <button
          onClick={submit}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Request Pilot
        </button>
      </div>
    </main>
  );
}
