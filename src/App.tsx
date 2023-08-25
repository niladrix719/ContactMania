import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from './components/navbar'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartsAndMaps from "./charts-and-maps";

interface Contact {
  name: string;
  status: string;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/charts_and_maps" element={<ChartsAndMaps />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const addContact = () => {
    if (name && status) {
      setContacts([...contacts, { name, status }]);
      setName("");
      setStatus("");
    }
  };

  const toggleStatus = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].status =
      contacts[index].status === "active" ? "inactive" : "active";
    setContacts(updatedContacts);
  };

  const deleteContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div>
    <Navbar />
      <div className="w-full flex flex-col items-center py-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="w-5/6 border border-white rounded-lg p-4 flex justify-between items-center"
          >
            <p>{contact.name}</p>
            <p>Status: {contact.status}</p>
            <button onClick={() => toggleStatus(index)}>
              Toggle Status
            </button>
            <button onClick={() => deleteContact(index)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Contact Dialog */}
      {true && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="fixed bottom-4 right-4">
              <button className="p-4 rounded-full bg-blue-500 text-white">
                <AiOutlinePlus />
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Pedro Duarte"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(e) => setStatus(e)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={addContact}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create Contact
              </button>
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default App;
