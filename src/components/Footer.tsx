import { Facebook, Twitter, Instagram } from "lucide-react";


export default function Footer() {
    const year = new Date().getFullYear();

    return(
        <footer className="mt-auto py-8 flex flex-col items-center justify-center text-gray-500">
        <div className="flex gap-4 mb-2">
          <Facebook size={20} className="hover:text-[#b7c8d4] cursor-pointer" />
          <Twitter size={20} className="hover:text-[#b7c8d4] cursor-pointer" />
          <Instagram size={20} className="hover:text-[#b7c8d4] cursor-pointer" />
        </div>
        <p className="text-sm">© {year} CineVerse. Todos os direitos reservados.</p>
      </footer>
    )
}