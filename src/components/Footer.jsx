import React from "react";
import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Database className="h-5 w-5 text-violet-400" />
            <span className="font-semibold">QuickDB</span>
            <span className="text-muted-foreground">© 2024</span>
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
