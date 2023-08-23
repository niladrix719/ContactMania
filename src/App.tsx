import Navbar from "./components/navbar";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartsAndMaps from "./charts-and-maps";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    setContacts([...contacts, { name, status }]);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center py-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="w-5/6 border border-white rounded-lg p-4 flex justify-evenly cursor-pointer"
          >
            <p>{contact.name}</p>
            <p>{contact.status}</p>
          </div>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Add Contact&nbsp;
              <AiOutlinePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new contact.
              </DialogDescription>
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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Status
                </Label>
                <Select>
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
              <Button onClick={addContact} type="button">
                Create Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
