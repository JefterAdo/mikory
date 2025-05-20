"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useState, useEffect } from 'react';

// Styles pour l'éditeur Tiptap
import './TiptapEditor.css';

// Types pour les boutons de la barre d'outils
type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

// Composant pour les boutons de la barre d'outils
const ToolbarButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children 
}: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded hover:bg-gray-700 ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};

// Types pour le composant TiptapEditor
type TiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  // Initialiser l'éditeur avec les extensions nécessaires
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Mettre à jour le contenu de l'éditeur lorsque la valeur change
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // État pour l'URL du lien
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  // Fonction pour ajouter un lien
  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  // Fonction pour ajouter une image
  const addImage = () => {
    const url = window.prompt('URL de l\'image');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      <div className="tiptap-toolbar flex flex-wrap gap-1 p-2 bg-gray-800 border-b border-gray-700">
        {/* Formatage de texte */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <span className="italic">I</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          <span className="line-through">S</span>
        </ToolbarButton>
        
        <div className="border-r border-gray-600 mx-1 h-6"></div>
        
        {/* Titres */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <span className="font-bold">H1</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <span className="font-bold">H2</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <span className="font-bold">H3</span>
        </ToolbarButton>
        
        <div className="border-r border-gray-600 mx-1 h-6"></div>
        
        {/* Listes */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <span>•</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <span>1.</span>
        </ToolbarButton>
        
        <div className="border-r border-gray-600 mx-1 h-6"></div>
        
        {/* Alignement */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
        >
          <span>←</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
        >
          <span>↔</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
        >
          <span>→</span>
        </ToolbarButton>
        
        <div className="border-r border-gray-600 mx-1 h-6"></div>
        
        {/* Liens et médias */}
        <ToolbarButton
          onClick={() => setShowLinkInput(!showLinkInput)}
          isActive={editor.isActive('link')}
        >
          <span>🔗</span>
        </ToolbarButton>
        
        <ToolbarButton onClick={addImage}>
          <span>🖼️</span>
        </ToolbarButton>
        
        <div className="border-r border-gray-600 mx-1 h-6"></div>
        
        {/* Autres formatages */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          <span>"</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
        >
          <span>{'</>'}</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <span>↩️</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <span>↪️</span>
        </ToolbarButton>
      </div>
      
      {/* Input pour les liens */}
      {showLinkInput && (
        <div className="flex items-center p-2 bg-gray-800 border-b border-gray-700">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-grow px-2 py-1 bg-gray-700 text-white rounded-l border-0 focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addLink();
              }
            }}
          />
          <button
            onClick={addLink}
            className="px-3 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      )}
      
      {/* Contenu de l'éditeur */}
      <div className="p-4 min-h-[400px] text-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
