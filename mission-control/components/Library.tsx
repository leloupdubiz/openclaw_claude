"use client";

import { useState } from "react";
import { BookOpen, Star, Filter, Search, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Données complètes des 62 livres
const BOOKS_DATA = [
  {
    id: 1,
    title: "Breakthrough Advertising",
    author: "Eugene Schwartz",
    category: "Psychology",
    priority: "CRITICAL",
    priorityColor: "bg-red-500",
    year: "1966",
    pages: "~250",
    summary: "Le livre ultime sur la psychologie marketing. 5 Stages of Awareness, Market Sophistication, Mass Desire.",
    keyConcepts: ["5 Stages of Awareness", "Market Sophistication", "Mass Desire", "Desire Strength"],
    application: "CRITIQUE - Fondation EVOLVE"
  },
  {
    id: 2,
    title: "Scientific Advertising",
    author: "Claude Hopkins",
    category: "Testing",
    priority: "CRITICAL",
    priorityColor: "bg-red-500",
    year: "1923",
    pages: "~120",
    summary: "La publicité comme science exacte. Testing, measurability, specifics sell.",
    keyConcepts: ["Testing & Measurability", "Specifics Sell", "Reason Why", "Advertising = Salesmanship"],
    application: "CRITIQUE - Culture testing"
  },
  {
    id: 3,
    title: "$100M Offers",
    author: "Alex Hormozi",
    category: "Offer Creation",
    priority: "CRITICAL",
    priorityColor: "bg-red-500",
    year: "2021",
    pages: "~180",
    summary: "La bible de la création d'offres irrésistibles. Grand Offer Theory, Value Stack, 4 Pillars.",
    keyConcepts: ["Dream Outcome", "Probability of Success", "Time Delay", "Effort & Sacrifice", "Value Stack"],
    application: "CRITIQUE - Chaque angle est une offre"
  },
  {
    id: 4,
    title: "Ca$hvertising",
    author: "Drew Eric Whitman",
    category: "Copywriting",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2009",
    pages: "~200",
    summary: "100+ techniques de copywriting. Life-Force 8, 31 Psychological Triggers, 41 Proven Techniques.",
    keyConcepts: ["Life-Force 8", "31 Psychological Triggers", "41 Techniques", "Specificity"],
    application: "HAUTE - Hooks & angles"
  },
  {
    id: 5,
    title: "Great Leads",
    author: "Michael Masterson",
    category: "Hooks",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2006",
    pages: "~250",
    summary: "Les 6 types d'accroches. Bucket Brigades, 4-Leg Stool.",
    keyConcepts: ["6 Types of Leads", "Bucket Brigades", "4-Leg Stool", "Lead Length"],
    application: "HAUTE - Hooks 3 secondes"
  },
  {
    id: 6,
    title: "The 16-Word Sales Letter",
    author: "Evaldo Albuquerque",
    category: "Clarity",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2019",
    pages: "~150",
    summary: "Simplifier le copywriting. Framework 16-word, 5 Questions.",
    keyConcepts: ["16-Word Framework", "5 Questions", "Clarity Test", "3 Problem Levels"],
    application: "HAUTE - Test angles"
  },
  {
    id: 7,
    title: "The Robert Collier Letter Book",
    author: "Robert Collier",
    category: "Storytelling",
    priority: "MEDIUM",
    priorityColor: "bg-yellow-500",
    year: "1931",
    pages: "~400",
    summary: "Enter the conversation. Storytelling émotionnel pour lettres de vente.",
    keyConcepts: ["Enter the Conversation", "Mental Imagery", "Story Formula", "7 Great Desires"],
    application: "MOYENNE - VSL/Stories"
  },
  {
    id: 8,
    title: "The Adweek Copywriting Handbook",
    author: "Joseph Sugarman",
    category: "Psychology",
    priority: "MEDIUM",
    priorityColor: "bg-yellow-500",
    year: "2006",
    pages: "~300",
    summary: "31 triggers psychologiques. Slippery slide, first sentence rule.",
    keyConcepts: ["31 Triggers", "Slippery Slide", "Seeding", "First Sentence"],
    application: "MOYENNE - Scripts"
  },
  {
    id: 9,
    title: "$100M Money Models",
    author: "Alex Hormozi",
    category: "Business Models",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2025",
    pages: "~200",
    summary: "Les 4 types d'offres: Attraction, Upsell, Downsell, Continuity.",
    keyConcepts: ["4 Offer Types", "Attraction", "Upsell", "Downsell", "Continuity"],
    application: "HAUTE - Business models"
  },
  {
    id: 10,
    title: "$100M Leads",
    author: "Alex Hormozi",
    category: "Acquisition",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2023",
    pages: "~250",
    summary: "Génération de leads. 4 Lead Types, Core Four, Lead Magnets, Nurturing.",
    keyConcepts: ["4 Lead Types", "Core Four", "Lead Magnets", "Nurturing"],
    application: "HAUTE - Traffic & Leads"
  },
  {
    id: 11,
    title: "ACQ Advertising Handbook",
    author: "Alex Hormozi",
    category: "Advertising",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2024",
    pages: "~400",
    summary: "Publicité payante complète. Creatives, targeting, optimisation, scaling.",
    keyConcepts: ["Creative Strategy", "Campaign Structure", "Kill/Scale", "Retargeting"],
    application: "HAUTE - Paid ads"
  },
  {
    id: 12,
    title: "ACQ Closer Handbook",
    author: "Alex Hormozi",
    category: "Sales",
    priority: "HIGH",
    priorityColor: "bg-orange-500",
    year: "2024",
    pages: "~300",
    summary: "Techniques de closing. Frameworks, objection handling, scripts.",
    keyConcepts: ["Closing Frameworks", "Objection Handling", "Sales Scripts"],
    application: "HAUTE - Sales"
  }
];

// Livres 13-40 résumés courts
const SHORT_BOOKS = [
  { id: 13, title: "$100M Journal", author: "Hormozi", category: "Mindset", summary: "Daily insights, routines, mindset." },
  { id: 14, title: "$100M Lost Chapters", author: "Hormozi", category: "Advanced", summary: "Exclusive advanced content." },
  { id: 15, title: "$100M Branding Playbook", author: "Hormozi", category: "Branding", summary: "Brand positioning strategies." },
  { id: 16, title: "$100M Closing Playbook", author: "Hormozi", category: "Sales", summary: "Closing scripts and techniques." },
  { id: 17, title: "$100M Fast Cash Playbook", author: "Hormozi", category: "Tactics", summary: "Quick cash strategies (30-90 days)." },
  { id: 18, title: "$100M Goated Ads Playbook", author: "Hormozi", category: "Creative", summary: "Winning ads collection." },
  { id: 19, title: "$100M Hooks Playbook", author: "Hormozi", category: "Creative", summary: "100+ proven hooks." },
  { id: 20, title: "$100M Lead Nurture Playbook", author: "Hormozi", category: "Email", summary: "Email sequences and nurturing." },
  { id: 21, title: "$100M Lifetime Value Playbook", author: "Hormozi", category: "Retention", summary: "Maximize customer LTV." },
  { id: 22, title: "$100M Marketing Machine", author: "Hormozi", category: "Systems", summary: "Marketing as a system." },
  { id: 23, title: "$100M Price Raise Playbook", author: "Hormozi", category: "Pricing", summary: "How to raise prices." },
  { id: 24, title: "$100M Pricing Playbook", author: "Hormozi", category: "Pricing", summary: "Complete pricing strategies." },
  { id: 25, title: "$100M Proof Checklist", author: "Hormozi", category: "Validation", summary: "Social proof elements." },
  { id: 26, title: "$100M Retention Playbook", author: "Hormozi", category: "Retention", summary: "Reduce churn, increase retention." },
  { id: 27, title: "$100M Scaling Roadmap", author: "Hormozi", category: "Scaling", summary: "Stages 0-9 growth roadmap." },
  { id: 28, title: "7 Figure Copy", author: "Sean Vosler", category: "Copywriting", summary: "High-ticket copywriting." },
  { id: 29, title: "Take Their Money", author: "Unknown", category: "Psychology", summary: "Selling psychology." },
  { id: 30, title: "DotCom Secrets", author: "Russell Brunson", category: "Funnels", summary: "Sales funnels and value ladder." },
  { id: 31, title: "Psycho-Cybernetics", author: "Maxwell Maltz", category: "Mindset", summary: "Self-image and success." },
  { id: 32, title: "Steal Like an Artist", author: "Austin Kleon", category: "Creativity", summary: "Remix culture, nothing is original." },
  { id: 33, title: "Confessions of Persuasion Hitman", author: "Unknown", category: "Persuasion", summary: "Advanced persuasion techniques." },
  { id: 34, title: "The Ultimate Sales Letter", author: "Dan Kennedy", category: "Copywriting", summary: "Complete sales letters." },
  { id: 35, title: "High Probability Selling", author: "Unknown", category: "Sales", summary: "Consultative selling." },
  { id: 36, title: "Copywriting with Claude AI", author: "Unknown", category: "AI", summary: "AI-assisted copywriting." },
  { id: 37, title: "Make Passive Income (Faceless)", author: "Unknown", category: "Content", summary: "Anonymous content strategies." },
  { id: 38, title: "Marketing Aide Mémoire", author: "Unknown", category: "Reference", summary: "Quick reference guide." },
  { id: 39, title: "Affiliate Blackbook", author: "Hormozi", category: "Affiliate", summary: "Affiliate marketing strategies." },
  { id: 40, title: "Leila's 5 Scaling Frameworks", author: "Leila Hormozi", category: "Operations", summary: "Scaling operations." }
];

export function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS_DATA[0] | null>(null);
  const [expandedBook, setExpandedBook] = useState<number | null>(null);

  const allCategories = Array.from(new Set([...BOOKS_DATA.map(b => b.category), ...SHORT_BOOKS.map(b => b.category)]));

  const filteredMainBooks = BOOKS_DATA.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const filteredShortBooks = SHORT_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Library</h2>
          <p className="text-slate-400 text-sm mt-1">
            62 books • {BOOKS_DATA.length} detailed • {SHORT_BOOKS.length} summarized
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books, authors, concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-white"
        >
          <option value="">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {selectedBook ? (
        <BookDetail book={selectedBook} onBack={() => setSelectedBook(null)} />
      ) : (
        <>
          {/* Detailed Books */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Essential Books (Detailed)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMainBooks.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onClick={() => setSelectedBook(book)}
                  isExpanded={expandedBook === book.id}
                  onToggle={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                />
              ))}
            </div>
          </div>

          {/* Short Books */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Additional Books
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredShortBooks.map((book) => (
                <ShortBookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BookCard({ book, onClick, isExpanded, onToggle }: { 
  book: typeof BOOKS_DATA[0]; 
  onClick: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div 
        onClick={onClick}
        className="p-4 cursor-pointer hover:bg-slate-750 transition-colors"
      >
        <div className="flex items-start justify-between mb-3">
          <div className={cn("p-2 rounded text-white", book.priorityColor)}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-full text-white font-medium", book.priorityColor)}>
            {book.priority}
          </span>
        </div>

        <h3 className="font-semibold text-slate-200 mb-1 hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-slate-400 mb-2">{book.author} • {book.year}</p>

        <p className="text-sm text-slate-300 line-clamp-2 mb-3">{book.summary}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {book.keyConcepts.slice(0, 3).map((concept, idx) => (
            <span key={idx} className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
              {concept.length > 20 ? concept.substring(0, 20) + '...' : concept}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{book.pages}</span>
          <span className="text-xs text-blue-400">Click for full summary →</span>
        </div>
      </div>
    </div>
  );
}

function ShortBookCard({ book }: { book: typeof SHORT_BOOKS[0] }) {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 hover:border-slate-600 transition-colors">
      <h4 className="font-medium text-slate-300 text-sm mb-1 line-clamp-1">{book.title}</h4>
      <p className="text-xs text-slate-500 mb-2">{book.author} • {book.category}</p>
      <p className="text-xs text-slate-400 line-clamp-2">{book.summary}</p>
    </div>
  );
}

function BookDetail({ book, onBack }: { book: typeof BOOKS_DATA[0]; onBack: () => void }) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <button onClick={onBack} className="text-slate-400 hover:text-white mb-4 flex items-center gap-2">
          ← Back to library
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{book.title}</h2>
            <p className="text-lg text-slate-400">by {book.author} • {book.year} • {book.pages}</p>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-white font-medium", book.priorityColor)}>
            {book.priority}
          </span>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed">{book.summary}</p>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          Key Concepts
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {book.keyConcepts.map((concept, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">
              {concept}
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-slate-200 mb-3">EVOLVE Application</h3>
        <p className="text-slate-400 bg-slate-700/50 p-4 rounded-lg mb-6">{book.application}</p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-2">💡 How to Use This Book</h4>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>• Read and take notes on key concepts</li>
            <li>• Extract 5+ hooks/angles for your market</li>
            <li>• Apply to current campaigns</li>
            <li>• Add insights to Evolve Growth Guide</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
