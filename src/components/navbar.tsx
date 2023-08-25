import { Button } from "@/components/ui/button";
import { ModeToggle } from "../components/mode-toggle";

function navbar() {
  return (
    <nav className="flex items-center justify-between p-4 w-full border-b">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold justify-start flex">Contact Mania</h1>
      </div>
      <div className="w-1/3 flex gap-4 items-center justify-end">
        <a href='/'>Home</a>
        <a href='/charts_and_maps'>Charts and Maps</a>
        <Button>Login</Button>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default navbar;
