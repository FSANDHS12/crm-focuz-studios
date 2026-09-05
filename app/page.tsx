"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Toaster, toast } from "sonner";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  Film,
  Filter,
  IndianRupee,
  LayoutGrid,
  List,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  UserPlus,
  Video,
  Monitor,
  MapPin,
  Phone,
  Clock,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type Card = {
  id: string;
  title: string;
  sub: string;
  date: string;
  value?: string;
  tag?: string;
  progress?: number;
};
function openPlatformLead(name: string) {
  window.dispatchEvent(
    new CustomEvent("open-platform-lead", { detail: { name } }),
  );
}
const menus = [
  ["Leads", Users],
  ["Upcoming Shoots", CalendarDays],
  ["Production - Shoot", Camera],
  ["Post Production", Film],
  ["Deliveries", CheckCircle2],
  ["Finance", IndianRupee],
  ["Social Media", Sparkles],
  ["Client Status Check", ClipboardCheck],
] as const;
const teamMenu = ["Team Dashboard", "Calendar", "Team & Allocation"];
const productionMenu = [
  "Overview",
  ...teamMenu,
  "Equipment",
  "Checklists",
  "Hard Disk Tracking",
  "Storage",
  "Completed Shoots",
];
const postMenu = [
  "Overview",
  ...teamMenu,
  "File Management",
  "Gallery Sharing",
  "Photo Editing",
  "Album Design",
  "Traditional Video Editing",
  "Wedding Film",
];
const socialMenu = [
  "Content Selection",
  "Reel Production",
  "Carousel Production",
  "YouTube Videos",
  "Client Approval",
  "Publishing Calendar",
  "Performance Tracking",
];
const statusMenu = ["Album", "Traditional Video", "Wedding Film"];
const eventOptions = [
  "Wedding",
  "Reception",
  "Engagement",
  "Pre-Wedding",
  "Maternity",
  "Baby Shower",
  "Birthday",
  "Corporate Event",
];
const serviceOptions = [
  "Photography Only",
  "Videography Only",
  "Photography + Videography",
  "Traditional Photography",
  "Candid Photography",
  "Wedding Film",
  "Complete Wedding Package",
];
const addOnOptions = [
  "Drone Coverage",
  "LED Wall",
  "Live Streaming",
  "Pre-Wedding Shoot",
  "Same-Day Edit",
  "Extra Photographer",
  "Extra Videographer",
];
const deliverableOptions = [
  "Online Gallery",
  "Highlight Pictures",
  "Photo Album",
  "Traditional Video",
  "Wedding Film",
  "Teaser Reel",
  "Client Hard Disk Copy",
];
const initial: Record<string, Record<string, Card[]>> = {
  Leads: {
    "New Leads": [
      {
        id: "1",
        title: "Arjun & Nithya",
        sub: "Wedding · Chennai",
        date: "04 Sep",
        value: "₹1,85,000",
        tag: "Instagram",
      },
      {
        id: "2",
        title: "Vikram & Dharani",
        sub: "Engagement · ECR",
        date: "03 Sep",
        value: "₹72,000",
        tag: "Referral",
      },
    ],
    "Follow-ups": [
      {
        id: "3",
        title: "Karthik & Meera",
        sub: "Wedding · Coimbatore",
        date: "Follow up today",
        value: "₹2,10,000",
        tag: "Website",
      },
    ],
    Meetings: [
      {
        id: "4",
        title: "Sanjay & Keerthi",
        sub: "Wedding + Reception",
        date: "Meet · 6:30 PM",
        value: "₹2,45,000",
        tag: "Hot",
      },
    ],
    "Quote Sent": [
      {
        id: "5",
        title: "Rahul & Priya",
        sub: "Wedding Film package",
        date: "Sent yesterday",
        value: "₹1,60,000",
        tag: "Viewed",
      },
    ],
    Won: [
      {
        id: "6",
        title: "Aakash & Anu",
        sub: "Full wedding package",
        date: "Shoot · 21 Sep",
        value: "₹2,25,000",
        tag: "Confirmed",
      },
    ],
    Lost: [],
  },
  "Upcoming Shoots": {
    "Yet to Plan": [
      {
        id: "u1",
        title: "Aakash & Anu",
        sub: "Wedding · Madurai",
        date: "21 Sep",
        tag: "18 days",
      },
    ],
    Draft: [
      {
        id: "u2",
        title: "Dinesh & Swetha",
        sub: "Reception · Chennai",
        date: "14 Sep",
        progress: 52,
        tag: "Invitations pending",
      },
    ],
    "Fully Planned": [
      {
        id: "u3",
        title: "Akil & Harini",
        sub: "Wedding · ECR",
        date: "08 Sep",
        progress: 100,
        tag: "Team confirmed",
      },
    ],
  },
  "Post Production": {
    "File Management": [
      {
        id: "p1",
        title: "Surya & Devi",
        sub: "2.4 TB · Server copied",
        date: "25 Aug",
        progress: 30,
      },
    ],
    "Gallery Sharing": [
      {
        id: "p2",
        title: "Hari & Lakshmi",
        sub: "RAW gallery shared",
        date: "Due · 7 Sep",
        progress: 42,
      },
    ],
    "Photo Editing": [
      {
        id: "p3",
        title: "Ashwin & Divya",
        sub: "Portrait retouching",
        date: "Due · 10 Sep",
        progress: 58,
      },
    ],
    "Album Design": [
      {
        id: "p4",
        title: "Naveen & Aarthi",
        sub: "Virtual album · AL-2",
        date: "Due today",
        progress: 74,
      },
    ],
    "Traditional Video": [
      {
        id: "p5",
        title: "Gokul & Janani",
        sub: "3 events · In editing",
        date: "Due · 13 Sep",
        progress: 48,
      },
    ],
    "Wedding Film": [
      {
        id: "p6",
        title: "Rohan & Sneha",
        sub: "RV-1 shared",
        date: "Due · 6 Sep",
        progress: 83,
      },
    ],
    Completed: [],
  },
};
const production = [
  [
    "Team Assignment",
    [
      "Lead photographer assigned",
      "Candid photographer assigned",
      "Videographer assigned",
      "Drone vendor blocked",
      "LED / external vendors blocked",
    ],
  ],
  [
    "Equipment Checklist",
    [
      "Camera bodies",
      "Lenses",
      "Batteries & chargers",
      "Memory cards",
      "Lights & stands",
      "Audio kit",
      "Drone & permits",
    ],
  ],
  [
    "Shooting Checklist",
    [
      "Venue establishing shots",
      "Bride & groom portraits",
      "Family groups",
      "Ceremony rituals",
      "Décor & details",
      "Guest candids",
    ],
  ],
  [
    "Client Hard Disk",
    [
      "Client hard disk received",
      "Capacity verified",
      "Labelled with project ID",
    ],
  ],
];
const postInitial: Record<string, Record<string, Card[]>> = {
  "4.1 File Management": {
    "Copied to Client HDD": [
      {
        id: "fm1",
        title: "Surya & Devi",
        sub: "2.4 TB · Client HDD verified",
        date: "25 Aug",
        tag: "Files",
      },
    ],
    "Copied to Server": [
      {
        id: "fm2",
        title: "Hari & Lakshmi",
        sub: "Server backup complete",
        date: "27 Aug",
        tag: "Backed up",
      },
    ],
  },
  "4.2 Gallery Sharing": {
    "Guest Access Shared": [
      {
        id: "gs1",
        title: "Akil & Harini",
        sub: "Guest access link active",
        date: "02 Sep",
      },
    ],
    "RAW Gallery Sent": [
      {
        id: "gs2",
        title: "Dinesh & Swetha",
        sub: "Photo selection requested",
        date: "03 Sep",
      },
    ],
    "CL Selection": [],
    "FS Selection": [
      {
        id: "gs3",
        title: "Vishal & Deepa",
        sub: "1,248 images selected",
        date: "04 Sep",
      },
    ],
    "CC Master List": [],
  },
  "4.3 Photo Editing": {
    "Portrait Retouching": [
      {
        id: "pe1",
        title: "Ashwin & Divya",
        sub: "86 portraits in progress",
        date: "Due · 10 Sep",
        progress: 58,
      },
    ],
    "Lr CC": [
      {
        id: "pe2",
        title: "Hari & Lakshmi",
        sub: "Lightroom colour correction",
        date: "Due · 09 Sep",
        progress: 72,
      },
    ],
  },
  "4.4 Album Design": {
    "Ready for Album Designing": [
      {
        id: "ad1",
        title: "Naveen & Aarthi",
        sub: "2 albums · 40 sheets each",
        date: "Ready today",
      },
    ],
    WIP: [
      {
        id: "ad2",
        title: "Manoj & Kavya",
        sub: "Spread design in progress",
        date: "Due · 11 Sep",
        progress: 45,
      },
    ],
    QC: [],
    "Virtual Album Shared": [
      {
        id: "ad3",
        title: "Pranav & Riya",
        sub: "Review link shared",
        date: "04 Sep",
        progress: 70,
      },
    ],
    "AL-1": [],
    "AL-2": [
      {
        id: "ad4",
        title: "Kiran & Meena",
        sub: "Second revision received",
        date: "Due today",
        progress: 82,
      },
    ],
    "AL-3": [],
    "Approved for Printing": [],
    "Send to Print": [],
    "Delivered to Client": [],
  },
  "4.5 Traditional Video Editing": {
    "Yet to Start": [
      {
        id: "tv1",
        title: "Gokul & Janani",
        sub: "3 events · 11 hours footage",
        date: "Queue · 05 Sep",
      },
    ],
    "In Editing": [
      {
        id: "tv2",
        title: "Rahul & Priya",
        sub: "Wedding + reception",
        date: "Due · 13 Sep",
        progress: 48,
      },
    ],
    "Link Shared": [],
    "Re-Edit · Special Case": [],
    "Copied to Client HDD": [],
  },
  "4.6 Wedding Film": {
    "Yet to Start": [
      {
        id: "wf1",
        title: "Aakash & Anu",
        sub: "2 events · Teaser + film",
        date: "Queue · 08 Sep",
      },
    ],
    "In Editing": [
      {
        id: "wf2",
        title: "Sanjay & Keerthi",
        sub: "Cinematic film in progress",
        date: "Due · 16 Sep",
        progress: 40,
      },
    ],
    "YT Link Shared": [],
    "RV-1": [
      {
        id: "wf3",
        title: "Rohan & Sneha",
        sub: "First review shared",
        date: "Feedback · 06 Sep",
        progress: 76,
      },
    ],
    "RV-2": [],
    "RV-3": [],
    "Special Case": [],
    "Final Version Shared": [],
    "Copied to Client HDD": [],
  },
};
export default function Home() {
  const [active, setActive] = useState("Leads"),
    [leadView, setLeadView] = useState<"dashboard" | "kanban">("dashboard"),
    [leadStageFilter, setLeadStageFilter] = useState("All Stages"),
    [activePost, setActivePost] = useState("Overview"),
    [activeProduction, setActiveProduction] = useState("Overview"),
    [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({
      Leads: true,
      "Production - Shoot": false,
      "Post Production": false,
    }),
    [selectedLeadCard, setSelectedLeadCard] = useState<
      (Card & { stage: string }) | null
    >(null),
    [boards, setBoards] = useState(initial),
    [mobile, setMobile] = useState(false),
    [query, setQuery] = useState(""),
    [lead, setLead] = useState({
      name: "",
      phone: "",
      email: "",
      event: "Wedding",
      service: "Complete Wedding Package",
      eventDate: "",
      venue: "",
      city: "",
      source: "Instagram",
      owner: "Focuz Studios",
      value: "",
      followUp: "",
      notes: "",
      addons: [] as string[],
      deliverables: [] as string[],
    });
  const move = (b: string, f: string, t: string, id: string) => {
    if (f === t) return;
    setBoards((p) => {
      const n = structuredClone(p),
        i = n[b][f].findIndex((x: Card) => x.id === id);
      if (i < 0) return p;
      n[b][t].push(n[b][f].splice(i, 1)[0]);
      return n;
    });
    toast.success(`Moved to ${t}`);
  };
  useEffect(() => {
    const open = (event: Event) => {
      const name = (event as CustomEvent).detail?.name || "";
      const found = Object.entries(boards.Leads)
        .flatMap(([stage, cards]) => cards.map((card) => ({ ...card, stage })))
        .find(
          (card) =>
            card.title === name ||
            name.includes(card.title) ||
            card.title.includes(name),
        );
      const delivery = deliveryLeads.find(
        (item) => item.couple === name || name.includes(item.couple),
      );
      setSelectedLeadCard(
        found ||
          (delivery
            ? {
                id: delivery.id,
                title: delivery.couple,
                sub: `${delivery.event} · ${delivery.venue}`,
                date: delivery.date,
                value: "₹2,25,000",
                tag: "Client",
                stage: "Won",
              }
            : {
                id: "FS-CLIENT",
                title: name || "Client",
                sub: "Wedding Project · Chennai",
                date: "Date scheduled",
                value: "₹2,00,000",
                tag: "Client",
                stage: "Won",
              }),
      );
      setActive("Leads");
      setMobile(false);
    };
    window.addEventListener("open-platform-lead", open);
    return () => window.removeEventListener("open-platform-lead", open);
  }, [boards]);
  const add = () => {
    if (!lead.name) return;
    const c = {
      id: crypto.randomUUID(),
      title: lead.name,
      sub: `${lead.event} · ${lead.service}`,
      date: lead.eventDate || "Date pending",
      value: lead.value ? `₹${lead.value}` : "Quote pending",
      tag: lead.source,
    };
    setBoards((p) => ({
      ...p,
      Leads: { ...p.Leads, "New Leads": [c, ...p.Leads["New Leads"]] },
    }));
    setLead({
      name: "",
      phone: "",
      email: "",
      event: "Wedding",
      service: "Complete Wedding Package",
      eventDate: "",
      venue: "",
      city: "",
      source: "Instagram",
      owner: "Focuz Studios",
      value: "",
      followUp: "",
      notes: "",
      addons: [],
      deliverables: [],
    });
    toast.success("Lead added");
  };
  const openPost = (name: string) => {
    setActivePost(name);
    setActive("Post Production");
    setMobile(false);
  };
  const openProduction = (name: string) => {
    setActiveProduction(name);
    setActive("Production - Shoot");
    setMobile(false);
  };
  const leads = Object.values(boards.Leads).flat(),
    total = leads.reduce(
      (n, c) => n + Number((c.value || "").replace(/\D/g, "")),
      0,
    );
  return (
    <div>
      <Toaster richColors />
      {mobile && <button className="scrim" onClick={() => setMobile(false)} />}
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <img src="/focuz-logo.png" alt="Focuz Studios logo" />
          <div>
            <b>FOCUZ</b>
            <span>STUDIOS CRM</span>
          </div>
          <button onClick={() => setMobile(false)}>
            <X />
          </button>
        </div>
        <nav>
          {menus.map(([m, I], index) => (
            <div className="nav-group" key={m}>
              <button
                data-color={index + 1}
                className={active === m ? "active" : ""}
                onClick={() => {
                  if (
                    m === "Leads" ||
                    m === "Production - Shoot" ||
                    m === "Post Production"
                  ) {
                    setExpandedNav((current) => ({
                      ...current,
                      [m]: active === m ? !current[m] : true,
                    }));
                  }
                  setActive(m);
                  setSelectedLeadCard(null);
                  setMobile(false);
                }}
              >
                <I />
                <span>{m}</span>
                {m === "Leads" && <em>6</em>}
                {(m === "Leads" ||
                  m === "Post Production" ||
                  m === "Production - Shoot") && (
                  <ChevronDown className="nav-chevron" />
                )}
              </button>
              {m === "Post Production" && expandedNav[m] && (
                <div className="post-submenu">
                  {postMenu.map((item) => (
                    <button
                      className={activePost === item ? "selected" : ""}
                      key={item}
                      onClick={() => openPost(item)}
                    >
                      <span>•</span>
                      {item}
                    </button>
                  ))}
                </div>
              )}
              {m === "Production - Shoot" && expandedNav[m] && (
                <div className="post-submenu production-submenu">
                  {productionMenu.map((item) => (
                    <button
                      className={activeProduction === item ? "selected" : ""}
                      key={item}
                      onClick={() => openProduction(item)}
                    >
                      <span>•</span>
                      {item}
                    </button>
                  ))}
                </div>
              )}
              {m === "Leads" && expandedNav[m] && (
                <div className="leads-submenu">
                  <button
                    className={leadView === "dashboard" ? "selected" : ""}
                    onClick={() => {
                      setLeadView("dashboard");
                      setLeadStageFilter("All Stages");
                    }}
                  >
                    <span />
                    <LayoutGrid /> Dashboard
                  </button>
                  <button
                    className={
                      leadView === "kanban" && leadStageFilter === "All Stages"
                        ? "selected"
                        : ""
                    }
                    onClick={() => {
                      setLeadView("kanban");
                      setLeadStageFilter("All Stages");
                    }}
                  >
                    <span />
                    <List /> Kanban View
                  </button>
                  <button
                    className={
                      leadView === "kanban" && leadStageFilter === "All Stages"
                        ? "stage-selected"
                        : ""
                    }
                    onClick={() => {
                      setLeadView("kanban");
                      setLeadStageFilter("All Stages");
                    }}
                  >
                    <span />
                    All Stages
                  </button>
                  {Object.keys(boards.Leads).map((stage) => (
                    <button
                      className={
                        leadView === "kanban" && leadStageFilter === stage
                          ? "stage-selected"
                          : ""
                      }
                      key={stage}
                      onClick={() => {
                        setLeadView("kanban");
                        setLeadStageFilter(stage);
                      }}
                    >
                      <span />
                      {stage}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="user">
          <img src="/focuz-logo.png" alt="" />
          <span>
            <b>Focuz Studios</b>
            <small>Owner workspace</small>
          </span>
          <MoreHorizontal />
        </div>
      </aside>
      <main>
        <header>
          <button className="hamb" onClick={() => setMobile(true)}>
            <Menu />
          </button>
          <div>
            <small>STUDIO WORKSPACE / {active.toUpperCase()}</small>
            <h1>
              {active === "Post Production"
                ? activePost
                : active === "Production - Shoot"
                  ? activeProduction
                  : active}
            </h1>
          </div>
          <section>
            <label>
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clients, projects…"
              />
            </label>
            {active === "Leads" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> New Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="lead-dialog">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                  </DialogHeader>
                  <div className="lead-form">
                    <div className="form-section full">
                      <b>Client Information</b>
                      <span>Couple and contact details</span>
                    </div>
                    <label>
                      <span>Couple Name *</span>
                      <Input
                        placeholder="Arun & Kavya"
                        value={lead.name}
                        onChange={(e) =>
                          setLead({ ...lead, name: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>WhatsApp Number *</span>
                      <Input
                        placeholder="+91 98765 43210"
                        value={lead.phone}
                        onChange={(e) =>
                          setLead({ ...lead, phone: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>Email Address</span>
                      <Input
                        type="email"
                        placeholder="couple@email.com"
                        value={lead.email}
                        onChange={(e) =>
                          setLead({ ...lead, email: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>Lead Source</span>
                      <select
                        value={lead.source}
                        onChange={(e) =>
                          setLead({ ...lead, source: e.target.value })
                        }
                      >
                        <option>Instagram</option>
                        <option>Website</option>
                        <option>Referral</option>
                        <option>WhatsApp</option>
                        <option>Google</option>
                        <option>Walk-in</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <div className="form-section full">
                      <b>Event Information</b>
                      <span>Event type, date and location</span>
                    </div>
                    <label>
                      <span>Event Type *</span>
                      <select
                        value={lead.event}
                        onChange={(e) =>
                          setLead({ ...lead, event: e.target.value })
                        }
                      >
                        {eventOptions.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Event Date</span>
                      <Input
                        type="date"
                        value={lead.eventDate}
                        onChange={(e) =>
                          setLead({ ...lead, eventDate: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>Venue</span>
                      <Input
                        placeholder="Venue name"
                        value={lead.venue}
                        onChange={(e) =>
                          setLead({ ...lead, venue: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>City</span>
                      <Input
                        placeholder="Chennai"
                        value={lead.city}
                        onChange={(e) =>
                          setLead({ ...lead, city: e.target.value })
                        }
                      />
                    </label>
                    <div className="form-section full">
                      <b>Quote Template</b>
                      <span>Service, add-ons and deliverables</span>
                    </div>
                    <label className="full">
                      <span>Primary Service *</span>
                      <select
                        value={lead.service}
                        onChange={(e) =>
                          setLead({ ...lead, service: e.target.value })
                        }
                      >
                        {serviceOptions.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <fieldset className="choice-box full">
                      <legend>Add-ons</legend>
                      <div>
                        {addOnOptions.map((x) => (
                          <label key={x}>
                            <Checkbox
                              checked={lead.addons.includes(x)}
                              onCheckedChange={(v) =>
                                setLead({
                                  ...lead,
                                  addons: v
                                    ? [...lead.addons, x]
                                    : lead.addons.filter((a) => a !== x),
                                })
                              }
                            />
                            <span>{x}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset className="choice-box full">
                      <legend>Deliverables</legend>
                      <div>
                        {deliverableOptions.map((x) => (
                          <label key={x}>
                            <Checkbox
                              checked={lead.deliverables.includes(x)}
                              onCheckedChange={(v) =>
                                setLead({
                                  ...lead,
                                  deliverables: v
                                    ? [...lead.deliverables, x]
                                    : lead.deliverables.filter((a) => a !== x),
                                })
                              }
                            />
                            <span>{x}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label>
                      <span>Estimated Quote (₹)</span>
                      <Input
                        inputMode="numeric"
                        placeholder="185000"
                        value={lead.value}
                        onChange={(e) =>
                          setLead({ ...lead, value: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>Follow-up Date</span>
                      <Input
                        type="date"
                        value={lead.followUp}
                        onChange={(e) =>
                          setLead({ ...lead, followUp: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      <span>Lead Owner</span>
                      <select
                        value={lead.owner}
                        onChange={(e) =>
                          setLead({ ...lead, owner: e.target.value })
                        }
                      >
                        <option>Focuz Studios</option>
                        <option>Chandhru</option>
                        <option>Sales Team</option>
                        <option>Studio Manager</option>
                      </select>
                    </label>
                    <label className="full">
                      <span>Special Notes</span>
                      <textarea
                        placeholder="Requirements, preferred style, package discussion…"
                        value={lead.notes}
                        onChange={(e) =>
                          setLead({ ...lead, notes: e.target.value })
                        }
                      />
                    </label>
                    <div className="lead-form-actions full">
                      <Button variant="outline">Save as Draft</Button>
                      <Button onClick={add}>Create Lead</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </section>
        </header>
        {active === "Leads" &&
          (selectedLeadCard ? (
            <LeadDetail
              lead={selectedLeadCard}
              onBack={() => setSelectedLeadCard(null)}
            />
          ) : (
            <LeadsWorkspace
              view={leadView}
              setView={setLeadView}
              stageFilter={leadStageFilter}
              setStageFilter={setLeadStageFilter}
              data={boards.Leads}
              query={query}
              setQuery={setQuery}
              move={move}
              total={total}
              onSelect={setSelectedLeadCard}
            />
          ))}
        {active === "Upcoming Shoots" && <UpcomingShootsWorkspace />}
        {active === "Post Production" &&
          (activePost === "Overview" ? (
            <PostProductionOverview />
          ) : teamMenu.includes(activePost) ? (
            <TeamOperations view={activePost} context="Post Production" />
          ) : (
            <PostProduction query={query} selected={activePost} />
          ))}
        {active === "Production - Shoot" &&
          (activeProduction === "Equipment" ? (
            <EquipmentChecklist />
          ) : activeProduction === "Checklists" ? (
            <ShootingChecklist />
          ) : teamMenu.includes(activeProduction) ? (
            <TeamOperations view={activeProduction} context="Production" />
          ) : activeProduction === "Overview" ? (
            <ProductionShootOverview />
          ) : (
            <ProductionSubsection title={activeProduction} />
          ))}
        {active === "Deliveries" && <Deliveries />}{" "}
        {active === "Finance" && <Finance />}
        {active === "Social Media" && <SocialMedia />}{" "}
        {active === "Client Status Check" && <ClientStatusTracker />}
      </main>
    </div>
  );
}
const leadColors = [
  "#7138ef",
  "#2588ef",
  "#ff9c26",
  "#17bfa0",
  "#57b94b",
  "#f05268",
];
function LeadsWorkspace({
  view,
  setView,
  stageFilter,
  setStageFilter,
  data,
  query,
  setQuery,
  move,
  total,
  onSelect,
}: any) {
  const [kanbanMode, setKanbanMode] = useState<"board" | "table">("board");
  const [dashboardFilter, setDashboardFilter] = useState("All Leads");
  const stages = Object.entries(data) as [string, Card[]][];
  const leads = stages.flatMap(([stage, cards]) =>
    cards.map((card) => ({ ...card, stage })),
  );
  const visibleStages =
    stageFilter === "All Stages"
      ? stages
      : stages.filter(([stage]) => stage === stageFilter);
  const visibleData = Object.fromEntries(visibleStages);
  const visibleLeads = leads.filter(
    (lead) => stageFilter === "All Stages" || lead.stage === stageFilter,
  );
  const count = (stage: string) => data[stage]?.length || 0;
  const sourceMap = leads.reduce((acc: Record<string, number>, lead: Card) => {
    const source = lead.tag || "Others";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});
  const sources = Object.entries(sourceMap).map(([name, value]) => ({
    name,
    value,
  }));
  const dashboardLeads =
    dashboardFilter === "All Leads"
      ? leads
      : leads.filter((lead) => lead.stage === dashboardFilter);
  const funnelRows = [
    ["New Leads", count("New Leads"), "#7138ef"],
    [
      "Contacted",
      count("Follow-ups") +
        count("Meetings") +
        count("Quote Sent") +
        count("Won"),
      "#2588ef",
    ],
    [
      "Meetings Done",
      count("Meetings") + count("Quote Sent") + count("Won"),
      "#ff9c26",
    ],
    ["Quotes Sent", count("Quote Sent") + count("Won"), "#17bfa0"],
    ["Won", count("Won"), "#57b94b"],
    ["Lost", count("Lost"), "#f05268"],
  ] as const;
  const kpis = [
    ["Total Leads", leads.length, "18%", Users],
    ["New Leads", count("New Leads"), "12%", Users],
    ["Meetings", count("Meetings"), "8%", CalendarDays],
    ["Quotes Sent", count("Quote Sent"), "10%", ClipboardCheck],
  ] as const;
  return (
    <section className="leads-workspace">
      <div className="leads-page-head">
        <div>
          <h2>
            {view === "dashboard" ? "Leads Dashboard" : "Leads – Kanban View"}
          </h2>
          <p>
            {view === "dashboard"
              ? "Track and manage your leads from enquiry to booking."
              : "Visualize and manage your leads pipeline from enquiry to booking."}
          </p>
        </div>
        <div className="lead-tools">
          <button>
            <CalendarDays /> This Month <ChevronDown />
          </button>
          <button>
            <Filter /> Filters
          </button>
        </div>
      </div>
      <div className="lead-kpis dashboard-kpis">
        {kpis.map(([label, value, change, Icon], i) => (
          <article key={label} style={{ "--kpi": leadColors[i] } as any}>
            <span className="kpi-icon">
              <Icon />
            </span>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>
                <TrendingUp /> {change} <span>from last month</span>
              </em>
            </div>
          </article>
        ))}
        <article
          className="conversion-kpi"
          style={{ "--kpi": "#57b94b" } as any}
        >
          <div>
            <span>Won</span>
            <strong>{count("Won")}</strong>
            <small>
              {leads.length
                ? Math.round((count("Won") / leads.length) * 100)
                : 0}
              %
            </small>
          </div>
          <div>
            <span>Lost</span>
            <strong>{count("Lost")}</strong>
            <small>
              {leads.length
                ? Math.round((count("Lost") / leads.length) * 100)
                : 0}
              %
            </small>
          </div>
          <footer>
            <span>Win Rate</span>
            <b>
              {count("Won") + count("Lost")
                ? Math.round(
                    (count("Won") / (count("Won") + count("Lost"))) * 100,
                  )
                : 0}
              %
            </b>
          </footer>
        </article>
      </div>
      <div className="lead-view-switch">
        <button
          className={view === "dashboard" ? "active" : ""}
          onClick={() => {
            setView("dashboard");
            setStageFilter("All Stages");
          }}
        >
          <LayoutGrid /> Dashboard
        </button>
        <button
          className={view === "kanban" ? "active" : ""}
          onClick={() => {
            setView("kanban");
            setStageFilter("All Stages");
          }}
        >
          <List /> Kanban View
        </button>
      </div>
      {view === "dashboard" ? (
        <>
          <div className="lead-charts">
            <article>
              <h3>Leads by Source</h3>
              <div className="donut-wrap">
                <ResponsiveContainer width="58%" height={205}>
                  <PieChart>
                    <Pie
                      data={sources}
                      dataKey="value"
                      innerRadius={56}
                      outerRadius={82}
                      paddingAngle={2}
                    >
                      {sources.map((_, i) => (
                        <Cell
                          key={i}
                          fill={leadColors[i % leadColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {sources.map((s, i) => (
                    <span key={s.name}>
                      <i
                        style={{
                          background: leadColors[i % leadColors.length],
                        }}
                      />
                      {s.name}
                      <b>{s.value}</b>
                    </span>
                  ))}
                </div>
                <strong className="donut-total">
                  {leads.length}
                  <small>Total</small>
                </strong>
              </div>
            </article>
            <article className="funnel-card">
              <h3>Leads Funnel</h3>
              <div className="funnel-layout">
                <div className="funnel-shape">
                  {funnelRows.map(([label, value, color], i) => (
                    <div
                      key={label}
                      className="funnel-segment"
                      style={
                        { "--funnel": color, width: `${100 - i * 12}%` } as any
                      }
                      title={`${label}: ${value}`}
                    />
                  ))}
                </div>
                <div className="funnel-metrics">
                  {funnelRows.map(([label, value, color], i) => {
                    const previous =
                      i === 0 ? leads.length : Number(funnelRows[i - 1][1]);
                    const rate = previous
                      ? Math.round((Number(value) / previous) * 100)
                      : 0;
                    return (
                      <div key={label}>
                        <i style={{ background: color }} />
                        <strong>{value}</strong>
                        <span>{label}</span>
                        <em>{rate}%</em>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
            <article>
              <h3>Lead Status</h3>
              <div className="donut-wrap">
                <ResponsiveContainer width="58%" height={205}>
                  <PieChart>
                    <Pie
                      data={stages.map(([name, cards]) => ({
                        name,
                        value: cards.length,
                      }))}
                      dataKey="value"
                      innerRadius={56}
                      outerRadius={82}
                    >
                      {stages.map((_, i) => (
                        <Cell
                          key={i}
                          fill={leadColors[i % leadColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {stages.map(([name, cards], i) => (
                    <span key={name}>
                      <i
                        style={{
                          background: leadColors[i % leadColors.length],
                        }}
                      />
                      {name}
                      <b>{cards.length}</b>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
          <div className="leads-table-card">
            <div className="dashboard-stage-tabs">
              {["All Leads", ...stages.map(([stage]) => stage)].map((stage) => (
                <button
                  className={dashboardFilter === stage ? "active" : ""}
                  key={stage}
                  onClick={() => setDashboardFilter(stage)}
                >
                  {stage}
                </button>
              ))}
            </div>
            <div className="leads-table-toolbar">
              <div>
                <h3>{dashboardFilter}</h3>
                <span>{dashboardLeads.length} Leads</span>
              </div>
              <label>
                <Search />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search leads…"
                />
              </label>
              <button>
                <SlidersHorizontal />
                Filter
              </button>
              <button>
                <Download />
                Export
              </button>
            </div>
            <div className="leads-data-table">
              <div className="lead-row lead-row-head">
                <span>Lead ID</span>
                <span>Name</span>
                <span>Source</span>
                <span>Status</span>
                <span>Next Activity</span>
                <span>Budget</span>
                <span>Actions</span>
              </div>
              {dashboardLeads
                .filter((l) =>
                  (l.title + l.sub).toLowerCase().includes(query.toLowerCase()),
                )
                .map((l, i) => (
                  <div
                    className="lead-row clickable-lead"
                    key={l.id}
                    onClick={() => onSelect(l)}
                  >
                    <span>LD-{String(128 - i).padStart(3, "0")}</span>
                    <span>
                      <b>{l.title}</b>
                      <small>{l.sub}</small>
                    </span>
                    <span>{l.tag || "Others"}</span>
                    <span>
                      <em
                        className={`lead-status s${stages.findIndex(([s]) => s === l.stage)}`}
                      >
                        {l.stage}
                      </em>
                    </span>
                    <span>{l.date}</span>
                    <span>
                      <b>{l.value || "—"}</b>
                    </span>
                    <button>
                      <MoreHorizontal />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="active-stage-bar">
            <span>Showing:</span>
            <button
              className={stageFilter === "All Stages" ? "active" : ""}
              onClick={() => setStageFilter("All Stages")}
            >
              All Stages
            </button>
            {stages.map(([stage, cards], i) => (
              <button
                className={stageFilter === stage ? "active" : ""}
                style={{ "--stage": leadColors[i] } as any}
                key={stage}
                onClick={() => setStageFilter(stage)}
              >
                {stage}
                <b>{cards.length}</b>
              </button>
            ))}
          </div>
          <div className="kanban-toolbar">
            <div>
              <button
                className={kanbanMode === "board" ? "active" : ""}
                onClick={() => setKanbanMode("board")}
              >
                <LayoutGrid />
                Board View
              </button>
              <button
                className={kanbanMode === "table" ? "active" : ""}
                onClick={() => setKanbanMode("table")}
              >
                <List />
                Table View
              </button>
            </div>
            <label>
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads…"
              />
            </label>
            <button>
              Sort By: <b>Last Updated</b>
              <ChevronDown />
            </button>
          </div>
          {kanbanMode === "board" ? (
            <Board
              title={
                stageFilter === "All Stages"
                  ? "Lead Pipeline"
                  : `${stageFilter} Leads`
              }
              board="Leads"
              data={visibleData}
              query={query}
              move={move}
              onSelect={(card: Card, stage: string) =>
                onSelect({ ...card, stage })
              }
            />
          ) : (
            <div className="leads-table-card kanban-table">
              <div className="leads-data-table">
                <div className="lead-row lead-row-head">
                  <span>Lead ID</span>
                  <span>Name</span>
                  <span>Source</span>
                  <span>Status</span>
                  <span>Next Activity</span>
                  <span>Budget</span>
                  <span>Actions</span>
                </div>
                {visibleLeads
                  .filter((l) =>
                    (l.title + l.sub)
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  )
                  .map((l, i) => (
                    <div
                      className="lead-row clickable-lead"
                      key={l.id}
                      onClick={() => onSelect(l)}
                    >
                      <span>LD-{String(128 - i).padStart(3, "0")}</span>
                      <span>
                        <b>{l.title}</b>
                        <small>{l.sub}</small>
                      </span>
                      <span>{l.tag || "Others"}</span>
                      <span>
                        <em
                          className={`lead-status s${stages.findIndex(([s]) => s === l.stage)}`}
                        >
                          {l.stage}
                        </em>
                      </span>
                      <span>{l.date}</span>
                      <span>
                        <b>{l.value || "—"}</b>
                      </span>
                      <button>
                        <MoreHorizontal />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="pipeline-total">
            <span>
              {stageFilter === "All Stages"
                ? "Total pipeline value"
                : `${stageFilter} value`}
            </span>
            <strong>{formatPrice(priceTotal(visibleLeads))}</strong>
            <small>
              Across {visibleLeads.length}{" "}
              {visibleLeads.length === 1 ? "lead" : "leads"}
            </small>
          </div>
        </>
      )}
    </section>
  );
}
function LeadTabWorkspace({ tab, lead }: { tab: string; lead: Card }) {
  const type = tab.replace(/\s*\(\d+\)/, "");
  const seed: Record<string, string[]> = {
    Notes: [
      "Client prefers natural candid photographs",
      "Share premium album samples",
      "Confirm venue access timing",
    ],
    Comments: [
      "Budget discussion completed",
      "Family requested an additional album",
      "Drone approval pending",
    ],
    "Follow-ups": [
      "Call and share package details — 28 May, 11:00 AM",
      "Confirm meeting attendance — 30 May, 10:00 AM",
    ],
    Meetings: [
      "Studio consultation — 30 May, 4:00 PM",
      "Package finalisation — 02 Jun, 11:30 AM",
    ],
    Quotes: ["QT-1041 · Premium Wedding Package · ₹1,60,000 · Viewed"],
    Activity: [
      "Lead created from Instagram",
      "Status changed to current stage",
      "Client requirements updated",
      "Follow-up scheduled",
    ],
  };
  const [items, setItems] = useState<Record<string, string[]>>(seed);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [files, setFiles] = useState([
    "Requirements.pdf",
    "Venue-reference.jpg",
    "Package-selection.xlsx",
  ]);
  const add = () => {
    if (!draft.trim())
      return toast.error(`Enter ${type.toLowerCase()} details`);
    setItems((p) => ({ ...p, [type]: [...(p[type] || []), draft.trim()] }));
    setDraft("");
    toast.success(`${type} added`);
  };
  if (type === "Files")
    return (
      <div className="lead-record-workspace">
        <div className="record-head">
          <div>
            <h2>Files</h2>
            <p>Documents and references for {lead.title}</p>
          </div>
          <label className="upload-button">
            <Plus /> Upload Files
            <input
              type="file"
              multiple
              onChange={(e) => {
                const names = Array.from(e.target.files || []).map(
                  (f) => f.name,
                );
                setFiles((p) => [...p, ...names]);
                if (names.length)
                  toast.success(`${names.length} file(s) uploaded`);
              }}
            />
          </label>
        </div>
        <div className="file-grid">
          {files.map((file, i) => (
            <article key={`${file}-${i}`}>
              <span>📄</span>
              <div>
                <b>{file}</b>
                <small>Uploaded just now · Focuz Studios</small>
              </div>
              <button onClick={() => toast.success(`${file} downloaded`)}>
                <Download />
              </button>
              <button
                onClick={() => setFiles((p) => p.filter((_, x) => x !== i))}
              >
                <X />
              </button>
            </article>
          ))}
        </div>
      </div>
    );
  const list = items[type] || [];
  return (
    <div className="lead-record-workspace">
      <div className="record-head">
        <div>
          <h2>{type}</h2>
          <p>Manage this lead’s {type.toLowerCase()} and history.</p>
        </div>
      </div>
      {type !== "Activity" && (
        <div className="record-composer">
          {type === "Follow-ups" || type === "Meetings" ? (
            <Input
              type="datetime-local"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          ) : (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Add ${type.toLowerCase()}…`}
            />
          )}
          <Button onClick={add}>
            <Plus /> Add {type.replace(/s$/, "")}
          </Button>
        </div>
      )}
      <div className="record-list">
        {list.map((item, i) => (
          <article key={`${item}-${i}`}>
            <span className="record-icon">
              {type === "Notes"
                ? "N"
                : type === "Comments"
                  ? "C"
                  : type === "Meetings"
                    ? "M"
                    : type === "Quotes"
                      ? "Q"
                      : "•"}
            </span>
            {editing === i ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div>
                <b>{item}</b>
                <small>Updated by Karthik · Today</small>
              </div>
            )}
            <div>
              {editing === i ? (
                <>
                  <button
                    onClick={() => {
                      setItems((p) => ({
                        ...p,
                        [type]: p[type].map((x, n) => (n === i ? editText : x)),
                      }));
                      setEditing(null);
                      toast.success("Changes saved");
                    }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditing(i);
                      setEditText(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-action"
                    onClick={() =>
                      setItems((p) => ({
                        ...p,
                        [type]: p[type].filter((_, n) => n !== i),
                      }))
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function LeadDetail({
  lead,
  onBack,
}: {
  lead: Card & { stage: string };
  onBack: () => void;
}) {
  const stages = [
    "New Leads",
    "Follow-ups",
    "Meetings",
    "Quote Sent",
    "Won",
    "Lost",
  ];
  const current = Math.max(0, stages.indexOf(lead.stage));
  const [tab, setTab] = useState("Overview");
  const detailRows = [
    ["Client Names", lead.title],
    ["Contact Person", lead.title.split(" & ")[0]],
    ["Phone", "+91 87654 32109"],
    [
      "Email",
      `${lead.title.toLowerCase().replaceAll(" ", "").replace("&", ".")}@gmail.com`,
    ],
    ["Location", lead.sub.split(" · ")[1] || "Chennai"],
    ["Source", lead.tag || "Instagram"],
    ["Enquiry Date", "25 May 2026, 10:30 AM"],
    ["Wedding Date", lead.date],
    ["Event Type", lead.sub.split(" · ")[0]],
    ["Guest Count", "300 – 500"],
    ["Package Interest", "Premium"],
    ["Estimated Value", lead.value || "Quote pending"],
    ["Assigned To", "Karthik"],
    ["Current Status", lead.stage],
    ["Next Follow-up", "28 May 2026, 11:00 AM"],
  ];
  return (
    <section className="lead-detail">
      <div className="lead-detail-toolbar">
        <button onClick={onBack}>← Leads</button>
        <div>
          <Button
            variant="outline"
            onClick={() => toast.success("Lead edit form opened")}
          >
            Edit Lead
          </Button>
          <Button onClick={() => toast.success("Lead converted to project")}>
            Convert to Project
          </Button>
          <button>
            <MoreHorizontal />
          </button>
        </div>
      </div>
      <div className="lead-profile">
        <span className="lead-photo">
          {lead.title
            .split(" ")
            .filter((x) => x !== "&")
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div>
          <h2>
            {lead.title} <em>{lead.stage}</em>
          </h2>
          <p>
            <Phone /> +91 87654 32109
          </p>
          <p>
            ✉ {lead.title.toLowerCase().replaceAll(" ", "").replace("&", ".")}
            @gmail.com
          </p>
          <p>
            <MapPin /> {lead.sub.split(" · ")[1] || "Chennai"}
          </p>
        </div>
        <div className="lead-profile-facts">
          {[
            ["Source", lead.tag || "Instagram"],
            ["Enquiry Date", "25 May 2026"],
            ["Wedding Date", lead.date],
            ["Est. Value", lead.value || "—"],
            ["Assigned To", "Karthik"],
          ].map((x) => (
            <span key={x[0]}>
              {x[0]}
              <b>{x[1]}</b>
            </span>
          ))}
        </div>
      </div>
      <div className="lead-stage-track">
        {stages.map((s, i) => (
          <button
            key={s}
            className={i <= current ? "active" : ""}
            onClick={() => toast.success(`Stage selected: ${s}`)}
          >
            <i />
            {s}
          </button>
        ))}
      </div>
      <div className="lead-tabs">
        {[
          "Overview",
          "Notes (3)",
          "Comments (5)",
          "Follow-ups (4)",
          "Meetings (2)",
          "Quotes (1)",
          "Files (7)",
          "Activity",
        ].map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      {tab !== "Overview" ? (
        <LeadTabWorkspace tab={tab} lead={lead} />
      ) : (
        <div className="lead-detail-grid">
          <article className="about-lead">
            <h3>About the Lead</h3>
            {detailRows.map((x) => (
              <p key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
              </p>
            ))}
          </article>
          <div className="requirements">
            <article>
              <h3>Requirements</h3>
              <blockquote>
                Looking for candid photography and cinematic video coverage.
                Interested in album and teaser reel. Prefer natural and
                emotional shots.
              </blockquote>
              <h4>Services Interested</h4>
              <div className="service-tags">
                <span>Wedding Photography</span>
                <span>Cinematic Video</span>
                <span>Album</span>
                <span>Teaser Reel</span>
                <span>Drone Coverage</span>
              </div>
              <h4>Special Requirements</h4>
              <ul>
                <li>Pre-wedding shoot at a location to be confirmed</li>
                <li>Instagram reels within 48 hours</li>
                <li>Traditional and candid mix</li>
                <li>Drone shots for venue</li>
                <li>Parent album — two copies</li>
              </ul>
            </article>
            <article>
              <h3>Internal Remarks</h3>
              <blockquote>
                Good budget and serious enquiry. Family seems supportive. Follow
                up after sending package details.
              </blockquote>
            </article>
          </div>
          <aside className="lead-quick">
            <article>
              <h3>Quick Actions</h3>
              <div>
                {[
                  "Log Follow-up",
                  "Schedule Meeting",
                  "Send Quote",
                  "Mark as Won",
                  "Mark as Lost",
                  "Share Lead",
                ].map((x) => (
                  <button
                    key={x}
                    onClick={() => toast.success(`${x} action opened`)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </article>
            <article>
              <h3>Upcoming Follow-ups</h3>
              <p>
                <b>28 May 2026, 11:00 AM</b>
                <span>Call and share package details</span>
              </p>
            </article>
            <article>
              <h3>Upcoming Meetings</h3>
              <p>
                <b>30 May 2026, 4:00 PM</b>
                <span>In-person meeting at our studio</span>
              </p>
            </article>
            <article>
              <h3>Recent Activity</h3>
              {[
                "New lead created",
                "Status changed to New",
                "Note added",
                "Follow-up scheduled",
              ].map((x) => (
                <p key={x}>
                  <b>{x}</b>
                  <span>by Karthik</span>
                </p>
              ))}
            </article>
          </aside>
        </div>
      )}
    </section>
  );
}
function Stat({ a, b, c, red }: any) {
  return (
    <article>
      <span>{a}</span>
      <strong>{b}</strong>
      <small className={red ? "red" : ""}>{c}</small>
    </article>
  );
}
function Banner({ title, text }: any) {
  return (
    <div className="banner">
      <div>
        <b>{title}</b>
        <p>{text}</p>
      </div>
      <Button variant="outline">
        <CalendarDays /> Calendar
      </Button>
    </div>
  );
}

const shootProjects = [
  {
    id: "FS-2409",
    name: "Aakash & Anu",
    status: "Upcoming",
    date: "21 Sep 2026",
    location: "Madurai",
    venue: "Heritage Convention Centre",
    event: "Wedding",
    package: "Signature",
    value: "₹2,25,000",
    owner: "Karthik",
    progress: 25,
  },
  {
    id: "FS-2398",
    name: "Naveen & Aarthi",
    status: "Upcoming",
    date: "14 Sep 2026",
    location: "Chennai",
    venue: "The Leela Palace",
    event: "Wedding + Reception",
    package: "Premium",
    value: "₹2,20,000",
    owner: "Amrutha",
    progress: 40,
  },
  {
    id: "FS-2385",
    name: "Rohan & Sneha",
    status: "Ongoing",
    date: "08 Sep 2026",
    location: "ECR",
    venue: "Sea Cliff Resort",
    event: "Wedding Film",
    package: "Cinematic",
    value: "₹1,80,000",
    owner: "Vignesh",
    progress: 62,
  },
  {
    id: "FS-2371",
    name: "Akil & Harini",
    status: "Ongoing",
    date: "05 Sep 2026",
    location: "Coimbatore",
    venue: "Radisson Blu",
    event: "Reception",
    package: "Premium",
    value: "₹1,60,000",
    owner: "Manoj",
    progress: 78,
  },
  {
    id: "FS-2344",
    name: "Sanjay & Keerthi",
    status: "Completed",
    date: "28 Aug 2026",
    location: "Chennai",
    venue: "ITC Grand Chola",
    event: "Wedding",
    package: "Signature",
    value: "₹2,45,000",
    owner: "Ajay",
    progress: 100,
  },
  {
    id: "FS-2312",
    name: "Vikram & Dharani",
    status: "Cancelled",
    date: "18 Aug 2026",
    location: "ECR",
    venue: "Beach House",
    event: "Engagement",
    package: "Classic",
    value: "₹72,000",
    owner: "Karthik",
    progress: 10,
  },
];

function UpcomingShootsWorkspace() {
  const [status, setStatus] = useState("Upcoming");
  const [activeTab, setActiveTab] = useState("Overview");
  const available =
    status === "All Projects"
      ? shootProjects
      : shootProjects.filter((project) => project.status === status);
  const [projectId, setProjectId] = useState(shootProjects[0].id);
  const project =
    available.find((item) => item.id === projectId) ||
    available[0] ||
    shootProjects[0];
  const changeStatus = (next: string) => {
    setStatus(next);
    const list =
      next === "All Projects"
        ? shootProjects
        : shootProjects.filter((item) => item.status === next);
    if (list[0]) setProjectId(list[0].id);
  };
  const stages = [
    ["Event Details", "3 / 4"],
    ["Documents", "2 / 5"],
    ["Invitations", "1 / 3"],
    ["Couple Photos", "0 / 2"],
    ["Timeline", "1 / 4"],
  ];
  return (
    <section className="shoot-project-workspace">
      <div className="shoot-project-toolbar">
        <div>
          <small>PROJECTS / SHOOT PLANNING</small>
          <h2>{project.name}</h2>
          <p>
            {project.id} · {project.status}
          </p>
        </div>
        <label>
          <span>Select lead / project</span>
          <select
            value={project.id}
            onChange={(e) => setProjectId(e.target.value)}
          >
            {available.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name} · {item.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <nav className="shoot-status-nav" aria-label="Shoot status">
        {["All Projects", "Upcoming", "Ongoing", "Completed", "Cancelled"].map(
          (item) => (
            <button
              className={status === item ? "active" : ""}
              onClick={() => changeStatus(item)}
              key={item}
            >
              {item}
              <b>
                {item === "All Projects"
                  ? shootProjects.length
                  : shootProjects.filter((x) => x.status === item).length}
              </b>
            </button>
          ),
        )}
      </nav>
      <article
        className="shoot-client-card"
        onClick={() => openPlatformLead(project.name)}
      >
        <div className="shoot-couple-avatar">
          {project.name
            .split(/\s|&/)
            .filter(Boolean)
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="shoot-client-name">
          <h2>
            {project.name}{" "}
            <em className={`project-status ${project.status.toLowerCase()}`}>
              {project.status}
            </em>
          </h2>
          <p>Click to open complete lead details</p>
        </div>
        {[
          ["Wedding Date", project.date],
          ["Location", `${project.venue}, ${project.location}`],
          ["Package", `${project.package} · ${project.value}`],
          ["Project Owner", project.owner],
          ["Status", project.status],
        ].map(([label, value]) => (
          <div className="shoot-fact" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </article>
      <div className="shoot-detail-tabs">
        {[
          "Overview",
          "Event Details",
          "Documents",
          "Invitations",
          "Couple Photos",
          "Timeline",
          "Notes",
          "Activity",
        ].map((item) => (
          <button
            className={activeTab === item ? "active" : ""}
            onClick={() => setActiveTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      {activeTab === "Overview" ? (
        <>
          <div className="shoot-details-grid">
            <article className="shoot-info-panel">
              <header>
                <h3>Client Information</h3>
                <MoreHorizontal />
              </header>
              <dl>
                <dt>Groom</dt>
                <dd>{project.name.split(" & ")[0]}</dd>
                <dt>Phone</dt>
                <dd>+91 98765 43210</dd>
                <dt>Email</dt>
                <dd>
                  {project.name
                    .split(" & ")[0]
                    .toLowerCase()
                    .replace(/\s/g, "")}
                  @gmail.com
                </dd>
                <dt>Bride</dt>
                <dd>{project.name.split(" & ")[1]}</dd>
                <dt>Phone</dt>
                <dd>+91 99876 54321</dd>
                <dt>Address</dt>
                <dd>{project.location}, Tamil Nadu</dd>
              </dl>
            </article>
            <article className="shoot-info-panel">
              <header>
                <h3>Wedding Information</h3>
                <MoreHorizontal />
              </header>
              <dl>
                <dt>Wedding Date</dt>
                <dd>{project.date}</dd>
                <dt>Wedding Venue</dt>
                <dd>{project.venue}</dd>
                <dt>Estimated Guests</dt>
                <dd>300 – 400</dd>
                <dt>Wedding Type</dt>
                <dd>{project.event}</dd>
                <dt>Package</dt>
                <dd>{project.package}</dd>
                <dt>Contract Date</dt>
                <dd>20 May 2026</dd>
              </dl>
              <button onClick={() => toast.success("Contract opened")}>
                View Contract
              </button>
            </article>
            <article className="shoot-info-panel event-summary-panel">
              <header>
                <h3>Event Summary</h3>
                <MoreHorizontal />
              </header>
              {[
                ["Mehendi", "19 Sep 2026", "4:00 PM"],
                ["Sangeet", "20 Sep 2026", "7:00 PM"],
                [project.event, project.date, "6:00 AM"],
                ["Reception", project.date, "7:00 PM"],
              ].map(([name, date, time], i) => (
                <div key={`${name}-${i}`}>
                  <i className={`event-color e${i}`}>{i + 1}</i>
                  <b>{name}</b>
                  <span>{date}</span>
                  <span>{time}</span>
                </div>
              ))}
              <button onClick={() => toast.success("All events opened")}>
                View All Events
              </button>
            </article>
            <article className="shoot-info-panel progress-panel">
              <header>
                <h3>Project Progress</h3>
                <MoreHorizontal />
              </header>
              <div
                className="project-progress-ring"
                style={{ "--progress": `${project.progress}%` } as any}
              >
                <strong>
                  {project.progress}%<small>Completed</small>
                </strong>
              </div>
              {stages.map(([name, count]) => (
                <div className="project-stage" key={name}>
                  <span>{name}</span>
                  <b>{count}</b>
                </div>
              ))}
            </article>
            <article className="shoot-info-panel documents-panel">
              <header>
                <h3>Documents</h3>
                <button onClick={() => toast.success("Documents opened")}>
                  View All
                </button>
              </header>
              {[
                "Contract.pdf",
                "Advance Payment.pdf",
                "ID Proof - Groom.jpg",
                "ID Proof - Bride.jpg",
              ].map((file, i) => (
                <div key={file}>
                  <i>{i < 2 ? "PDF" : "JPG"}</i>
                  <span>
                    <b>{file}</b>
                    <small>Uploaded on 20 May 2026</small>
                  </span>
                  <button onClick={() => toast.success(`${file} downloaded`)}>
                    <Download />
                  </button>
                </div>
              ))}
            </article>
            <article className="shoot-info-panel invitation-panel">
              <header>
                <h3>Invitation</h3>
                <button onClick={() => toast.success("Invitation opened")}>
                  View All
                </button>
              </header>
              <div className="invitation-preview">
                <span>{project.name.split(" & ")[0]}</span>
                <b>&</b>
                <span>{project.name.split(" & ")[1]}</span>
                <small>{project.date}</small>
              </div>
              <dl>
                <dt>Invitation Type</dt>
                <dd>Digital</dd>
                <dt>Design</dt>
                <dd>Floral Elegance</dd>
                <dt>Status</dt>
                <dd className="approved">Approved</dd>
              </dl>
            </article>
            <article className="shoot-info-panel photos-panel">
              <header>
                <h3>Couple Photos</h3>
                <button
                  onClick={() => toast.success("Couple photo gallery opened")}
                >
                  View All
                </button>
              </header>
              <div>
                {[1, 2, 3, 4].map((n) => (
                  <button
                    onClick={() => toast.success(`Photo ${n} opened`)}
                    key={n}
                  >
                    <Users />
                    <span>{n === 4 ? "+12" : `${project.name}`}</span>
                  </button>
                ))}
              </div>
            </article>
            <article className="shoot-info-panel notes-panel">
              <header>
                <h3>Special Notes</h3>
                <button
                  onClick={() => toast.success("Notes can now be edited")}
                >
                  Edit
                </button>
              </header>
              <ul>
                <li>Bride wants more candid moments.</li>
                <li>Drone shots are mandatory.</li>
                <li>Family prefers timely delivery.</li>
                <li>Use soft, natural colour tones.</li>
                <li>Highlight moments with grandparents.</li>
              </ul>
            </article>
          </div>
          <article className="project-timeline">
            <h3>Project Timeline</h3>
            <div>
              {[
                ["Contract Signed", "Completed"],
                ["Advance Received", "Completed"],
                ["Event Details Shared", "Completed"],
                ["Documents Collected", "In Progress"],
                ["Invitation Approved", "Pending"],
                ["Shoot Day", project.status],
                ["Delivery", "Upcoming"],
              ].map(([name, state], i) => (
                <section
                  className={i < 3 ? "complete" : i === 3 ? "current" : ""}
                  key={name}
                >
                  <i />
                  <b>{name}</b>
                  <span>{state}</span>
                </section>
              ))}
            </div>
          </article>
        </>
      ) : (
        <UpcomingProjectTab tab={activeTab} project={project} />
      )}
    </section>
  );
}

function UpcomingProjectTab({
  tab,
  project,
}: {
  tab: string;
  project: (typeof shootProjects)[number];
}) {
  const presets: Record<string, string[]> = {
    "Event Details": [
      "Mehendi · 19 Sep 2026 · 4:00 PM",
      "Sangeet · 20 Sep 2026 · 7:00 PM",
      `${project.event} · ${project.date} · 6:00 AM`,
    ],
    Documents: [
      "Contract.pdf",
      "Advance Payment.pdf",
      "Groom ID Proof.jpg",
      "Bride ID Proof.jpg",
    ],
    Invitations: ["Digital invitation · Floral Elegance · Approved"],
    "Couple Photos": [
      "Outdoor portrait 01.jpg",
      "Candid reference 02.jpg",
      "Pre-wedding reference 03.jpg",
    ],
    Timeline: [
      "Contract signed · Completed",
      "Advance received · Completed",
      "Documents collected · In progress",
      "Shoot day · Upcoming",
    ],
    Notes: [
      "Bride wants more candid moments",
      "Drone shots are mandatory",
      "Family prefers timely delivery",
    ],
    Activity: [
      "Project created",
      "Advance payment recorded",
      "Event details updated",
      "Invitation approved",
    ],
  };
  const [items, setItems] = useState(presets[tab] || []);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const fileTab = ["Documents", "Couple Photos"].includes(tab);
  const add = () => {
    if (!draft.trim()) return toast.error(`Enter ${tab.toLowerCase()} details`);
    setItems((p) => [...p, draft.trim()]);
    setDraft("");
    toast.success(`${tab} updated`);
  };
  return (
    <article className="upcoming-tab-workspace">
      <header>
        <div>
          <h2>{tab}</h2>
          <p>
            {project.name} · {project.id}
          </p>
        </div>
        {fileTab && (
          <label className="upload-button">
            <Plus /> Upload
            <input
              type="file"
              multiple
              onChange={(e) => {
                const names = Array.from(e.target.files || []).map(
                  (file) => file.name,
                );
                setItems((p) => [...p, ...names]);
                if (names.length)
                  toast.success(`${names.length} file(s) uploaded`);
              }}
            />
          </label>
        )}
      </header>
      {tab !== "Activity" && !fileTab && (
        <div className="upcoming-tab-composer">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Add ${tab.toLowerCase()}…`}
          />
          <Button onClick={add}>
            <Plus /> Add
          </Button>
        </div>
      )}
      <div className="upcoming-tab-list">
        {items.map((item, i) => (
          <section key={`${item}-${i}`}>
            <i>
              {tab === "Documents"
                ? "DOC"
                : tab === "Couple Photos"
                  ? "IMG"
                  : i + 1}
            </i>
            {editing === i ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div>
                <b>{item}</b>
                <small>Updated today · {project.owner}</small>
              </div>
            )}
            <aside>
              {editing === i ? (
                <>
                  <button
                    onClick={() => {
                      setItems((p) =>
                        p.map((x, n) => (n === i ? editText : x)),
                      );
                      setEditing(null);
                      toast.success("Changes saved");
                    }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditing(i);
                      setEditText(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-action"
                    onClick={() => setItems((p) => p.filter((_, n) => n !== i))}
                  >
                    Delete
                  </button>
                </>
              )}
            </aside>
          </section>
        ))}
      </div>
    </article>
  );
}
function priceTotal(cards: Card[]) {
  return cards.reduce(
    (sum, c) => sum + Number((c.value || "").replace(/\D/g, "")),
    0,
  );
}
function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
function Board({ title, board, data, query, move, onSelect }: any) {
  return (
    <div className="board">
      <div className="boardhead">
        <div>
          <h2>{title}</h2>
          <span>Drag cards to update workflow stage</span>
        </div>
        <button>
          All owners <ChevronDown />
        </button>
      </div>
      <div className="kanban">
        {Object.entries(data).map(([stage, cards]: any) => (
          <section
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const [f, id] = e.dataTransfer.getData("text").split("::");
              move(board, f, stage, id);
            }}
          >
            <header className={board === "Leads" ? "lead-stage-head" : ""}>
              <div>
                <b>{stage}</b>
                {board !== "Leads" && <span>{cards.length}</span>}
              </div>
              {board === "Leads" && (
                <div className="stage-metrics">
                  <span>
                    <strong>{cards.length}</strong>
                    {cards.length === 1 ? " Lead" : " Leads"}
                  </span>
                  <span>
                    <strong>{formatPrice(priceTotal(cards))}</strong>Total Value
                  </span>
                </div>
              )}
            </header>
            <div>
              {cards
                .filter((c: Card) =>
                  (c.title + c.sub).toLowerCase().includes(query.toLowerCase()),
                )
                .map((c: Card) => (
                  <article
                    draggable
                    onClick={() =>
                      onSelect ? onSelect(c, stage) : openPlatformLead(c.title)
                    }
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text", `${stage}::${c.id}`)
                    }
                    key={c.id}
                  >
                    <div className="tag">
                      {c.tag || stage}
                      <MoreHorizontal />
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.sub}</p>
                    {c.progress !== undefined && (
                      <Progress value={c.progress} />
                    )}
                    <footer>
                      <span>
                        <CalendarDays />
                        {c.date}
                      </span>
                      <b>{c.value}</b>
                    </footer>
                    {board === "Leads" && (
                      <aside>
                        <button>
                          <MessageCircle />
                        </button>
                        <button>
                          <Send />
                        </button>
                      </aside>
                    )}
                  </article>
                ))}
              {!cards.length && <i className="empty">Drop here</i>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
const overviewStages = [
  {
    name: "RAW Gallery",
    status: "Completed",
    progress: 100,
    count: "32,145 / 32,145",
    editor: "Ramesh",
    role: "Data Manager",
    due: "22 Jan 2027",
  },
  {
    name: "Photo Editing",
    status: "In Progress",
    progress: 14,
    count: "1,245 / 8,432",
    editor: "Arul",
    role: "Photo Editor",
    due: "28 Jan 2027",
  },
  {
    name: "Album Design",
    status: "Pending",
    progress: 33,
    count: "1 / 3 Designs",
    editor: "Praveen",
    role: "Album Designer",
    due: "31 Jan 2027",
  },
  {
    name: "Video Editing",
    status: "In Progress",
    progress: 50,
    count: "2 / 4 Videos",
    editor: "Vignesh",
    role: "Video Editor",
    due: "30 Jan 2027",
  },
  {
    name: "Approval Tracking",
    status: "Pending",
    progress: 50,
    count: "3 / 6",
    editor: "Ajay",
    role: "Manager",
    due: "02 Feb 2027",
  },
  {
    name: "Delivery",
    status: "Pending",
    progress: 0,
    count: "0 / 2",
    editor: "—",
    role: "",
    due: "05 Feb 2027",
  },
];
function PostProductionOverview() {
  const [selectedLead, setSelectedLead] = useState(deliveryLeads[0].id);
  const lead = deliveryLeads.find((x) => x.id === selectedLead)!;
  const overall = Math.round(
    overviewStages.reduce((n, s) => n + s.progress, 0) / overviewStages.length,
  );
  return (
    <section className="post-overview">
      <LeadTrackerHeader
        selected={selectedLead}
        setSelected={setSelectedLead}
        label="POST PRODUCTION · CLIENT OVERVIEW"
      />
      <div className="overview-hero">
        <div>
          <span className="project-avatar">
            {lead.couple
              .split(" ")
              .filter((x) => x !== "&")
              .map((x) => x[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <h2>
              {lead.couple} <em>Upcoming</em>
            </h2>
            <div className="overview-facts">
              <span>
                Event Type<b>{lead.event}</b>
              </span>
              <span>
                Event Date<b>{lead.date}</b>
              </span>
              <span>
                Location<b>{lead.venue}</b>
              </span>
              <span>
                Package<b>{lead.package}</b>
              </span>
              <span>
                Total Data<b>1.45 TB</b>
              </span>
            </div>
          </div>
        </div>
        <div className="radial" style={{ "--pct": `${overall}%` } as any}>
          <strong>
            {overall}%<small>On Track</small>
          </strong>
        </div>
      </div>
      <div className="overview-stage-cards">
        {overviewStages.map((s, i) => (
          <article key={s.name}>
            <header>
              <span>
                {i + 1}. {s.name}
              </span>
              <MoreHorizontal />
            </header>
            <b
              className={`overview-status ${s.status.replace(" ", "").toLowerCase()}`}
            >
              {s.status}
            </b>
            <strong>{s.count}</strong>
            <Progress value={s.progress} />
            <footer>
              <span>Due: {s.due}</span>
              <b>{s.progress}%</b>
            </footer>
          </article>
        ))}
      </div>
      <div className="overview-main">
        <article className="project-info">
          <h3>Project Info</h3>
          {[
            ["Project ID", lead.id],
            ["Package", lead.package],
            ["Team Lead", "Amrutha"],
            ["Total Data", "1.45 TB"],
            ["Captured On", "20–22 Jan 2027"],
            ["Notes", "Priority project"],
          ].map((x) => (
            <p key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
            </p>
          ))}
          <Button variant="outline">View Project Details →</Button>
        </article>
        <article className="stages-overview">
          <h3>Stages Overview</h3>
          <div className="overview-table">
            <header>
              <span>Stage</span>
              <span>Status</span>
              <span>Progress</span>
              <span>Assigned Editor</span>
              <span>Due Date</span>
              <span>Action</span>
            </header>
            {overviewStages.map((s) => (
              <div key={s.name}>
                <b>{s.name}</b>
                <em
                  className={`overview-status ${s.status.replace(" ", "").toLowerCase()}`}
                >
                  {s.status}
                </em>
                <span>
                  <b>{s.count}</b>
                  <Progress value={s.progress} />
                  {s.progress}%
                </span>
                <span>
                  <b>{s.editor}</b>
                  <small>{s.role}</small>
                </span>
                <span>{s.due}</span>
                <button onClick={() => toast.success(`${s.name} opened`)}>
                  {s.progress ? "Continue" : "Start"}
                </button>
              </div>
            ))}
          </div>
        </article>
        <aside className="overview-side">
          <article>
            <h3>Assigned Editors</h3>
            {overviewStages
              .filter((s) => s.editor !== "—")
              .map((s) => (
                <p key={s.editor}>
                  <span className="mini-avatar">{s.editor[0]}</span>
                  <b>
                    {s.editor}
                    <small>{s.role}</small>
                  </b>
                  <em>{s.status}</em>
                </p>
              ))}
          </article>
          <article>
            <h3>Due Dates</h3>
            {overviewStages.slice(1).map((s) => (
              <p key={s.name}>
                <b>{s.name}</b>
                <span>{s.due}</span>
              </p>
            ))}
          </article>
        </aside>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {[
          [
            "22 Jan, 02:30 PM",
            "RAW files uploaded",
            "32,145 files uploaded by Ramesh",
          ],
          ["22 Jan, 03:15 PM", "Photo editing started", "Assigned to Arul"],
          [
            "22 Jan, 03:20 PM",
            "Album design pending",
            "Waiting for photo editing",
          ],
        ].map((x) => (
          <p key={x[0]}>
            <span>{x[0]}</span>
            <b>{x[1]}</b>
            <span>{x[2]}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
function PostProduction({ query, selected }: any) {
  const [data, setData] = useState(postInitial);
  const move = (workflow: string, from: string, to: string, id: string) => {
    if (from === to) return;
    setData((p) => {
      const n = structuredClone(p),
        i = n[workflow][from].findIndex((x: Card) => x.id === id);
      if (i < 0) return p;
      n[workflow][to].push(n[workflow][from].splice(i, 1)[0]);
      return n;
    });
    toast.success(`Moved to ${to}`);
  };
  const entry =
    Object.entries(data).find(
      ([workflow]) => workflow.replace(/^4\.\d\s+/, "") === selected,
    ) || Object.entries(data)[0];
  const [workflow, stages] = entry;
  return (
    <>
      <Banner
        title={selected}
        text={`Manage every ${selected.toLowerCase()} stage for all active shoots.`}
      />
      <div className="post-stack">
        <Board
          title={workflow}
          board={workflow}
          data={stages}
          query={query}
          move={move}
        />
      </div>
    </>
  );
}
const teamMembers = [
  { name: "Arul", role: "Photo Editor", projects: 12, load: 95 },
  { name: "Vignesh", role: "Video Editor", projects: 8, load: 75 },
  { name: "Ajay", role: "Album Designer", projects: 4, load: 50 },
  { name: "Hari", role: "Photographer", projects: 6, load: 60 },
  { name: "Mukesh", role: "Videographer", projects: 5, load: 45 },
];
const assignmentRoles = [
  "Lead Photographer",
  "Cinematographer",
  "Second Photographer",
  "Drone Operator",
  "Lighting Incharge",
  "Assistant",
  "Photo Editor",
  "Video Editor",
  "Album Designer",
];
const calendarEvents: Record<number, [string, string, string]> = {
  1: ["Rahul & Meera", "Mehendi", "#8b5cf6"],
  2: ["Rahul & Meera", "Sangeet", "#22c55e"],
  5: ["Arjun & Divya", "Pre-Wedding", "#3b82f6"],
  9: ["Vikram & Aishwarya", "Haldi", "#f59e0b"],
  10: ["Vikram & Aishwarya", "Wedding", "#ef476f"],
  13: ["Karthik & Nandhini", "Reception", "#22c55e"],
  15: ["Rahul & Meera", "Wedding", "#7c3aed"],
  19: ["Suresh & Kavya", "House Warming", "#a855f7"],
  22: ["Pranav & Keerthana", "Engagement", "#2563eb"],
  26: ["Ajay & Deepa", "Maternity", "#14b8a6"],
  30: ["Harish & Divya", "Reception", "#f59e0b"],
};
const equipmentRows = [
  [
    "C/P",
    "Amrutha & Gowtham",
    "Lead Photographer",
    "R3 & R5",
    "Canon RF 35mm / 1.8|Canon RF 50mm / 1.2|Canon RF 85mm / 1.2",
    "AD 600|AD 200|V1 Accessories",
    "Candid cards|Batteries|Cables",
  ],
  [
    "W/F",
    "Imman",
    "Videographer",
    "R5",
    "Canon RF 16mm / 2.8|Canon RF 28–70mm / 2",
    "LC 500R|SK-400 · 2|V860 Flash",
    "Wedding Films|Zoom recorder",
  ],
  [
    "T/P",
    "Gokul",
    "Third Photographer",
    "EOS R6",
    "Canon RF 24–105mm / 4L",
    "Beauty Box 85cm|Beauty Box 65cm",
    "128 GB Micro SD|DJI Osmo",
  ],
  [
    "T/V",
    "FX 30 Operator",
    "Gimbal & Video",
    "FX 30",
    "—",
    "X Pro Trigger · 2|Magmod Gels & Kits",
    "Camera Battery · 20|AAA Batteries",
  ],
];
function ShootHeader({ title, progress }: { title: string; progress: number }) {
  const [selected, setSelected] = useState(deliveryLeads[0].id);
  const lead =
    deliveryLeads.find((item) => item.id === selected) || deliveryLeads[0];
  return (
    <>
      <LeadTrackerHeader
        selected={selected}
        setSelected={setSelected}
        label="PRODUCTION SHOOT PROJECT"
      />
      <div className="shoot-breadcrumb">
        Production (Shoot) <span>›</span> <b>{title}</b>
      </div>
      <div className="shoot-project">
        <div className="project-avatar">
          {lead.couple
            .split(/\s|&/)
            .filter(Boolean)
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h2>
            {lead.couple} <em>Upcoming</em>
          </h2>
          <p>
            {lead.event} · {lead.date} · {lead.venue}
          </p>
        </div>
        <div className="shoot-team">
          <span>
            <Users /> Team Lead
          </span>
          <b>{lead.id === "FS-2409" ? "Karthik" : "Amrutha"}</b>
        </div>
        <div className="radial" style={{ "--pct": `${progress}%` } as any}>
          <strong>
            {progress}%<small>Complete</small>
          </strong>
        </div>
      </div>
    </>
  );
}
function EquipmentChecklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      equipmentRows.flatMap((r, ri) =>
        r.slice(3).flatMap((cell, ci) =>
          String(cell)
            .split("|")
            .map((_, ii) => [`${ri}-${ci}-${ii}`, ri < 2 || ii === 0]),
        ),
      ),
    ),
  );
  const keys = Object.keys(checks),
    done = keys.filter((k) => checks[k]).length,
    pct = Math.round((done / keys.length) * 100);
  return (
    <section className="shoot-workspace">
      <div className="shoot-actions">
        <Button
          onClick={() => toast.success("Custom equipment item ready to add")}
        >
          <Plus /> Add Custom Item
        </Button>
        <Button variant="outline">
          <Download /> Export
        </Button>
      </div>
      <ShootHeader title="Equipment Checklist" progress={pct} />
      <div className="shoot-kpis">
        {[
          ["Total Items", 128],
          ["Out (Taken)", 102],
          ["Packed", done],
          ["Returned (In)", 80],
          ["Pending Return", 22],
          ["Missing Items", 3],
        ].map((x, i) => (
          <article key={x[0]}>
            <Camera />
            <span>
              {x[0]}
              <strong>{x[1]}</strong>
            </span>
          </article>
        ))}
      </div>
      <div className="checklist-card">
        <div className="check-tabs">
          <button className="active">By Crew</button>
          <button>By Category</button>
          <button>Missing Items</button>
          <button>All Items</button>
          <Input placeholder="Search item…" />
        </div>
        <div className="equipment-table">
          <header>
            <span>Crew / Role</span>
            <span>Camera</span>
            <span>Lens</span>
            <span>Light Setup & Others</span>
            <span>Cards, Batteries & Cables</span>
          </header>
          {equipmentRows.map((row, ri) => (
            <div key={row[0]}>
              {row.map((cell, ci) => (
                <section key={ci}>
                  {ci === 0 ? (
                    <>
                      <b>{cell}</b>
                      <strong>{row[1]}</strong>
                      <em>{row[2]}</em>
                    </>
                  ) : (
                    String(cell)
                      .split("|")
                      .map((item, ii) => {
                        const key = `${ri}-${ci - 3}-${ii}`;
                        return (
                          <label key={item}>
                            <Checkbox
                              checked={!!checks[key]}
                              onCheckedChange={(v) =>
                                setChecks((p) => ({ ...p, [key]: !!v }))
                              }
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })
                  )}
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const shotRows = [
  ["Mandapam from Road", "Wide establishing shot"],
  ["Couple Name Board", "Capture clear name"],
  ["Outdoor Mandapam Decoration", "All decor details"],
  ["Inside Hall - Empty Hall", "Before guests arrive"],
  ["Welcome Area", "Flowers, lights, rangoli"],
  ["Welcoming Guest", "Guests arrival"],
  ["Bride & Groom Entry", "Entry moments"],
  ["Nadaswaram & Orchestra", "Music & ambience"],
  ["Guests - Wide Shots", "Crowd & ambience"],
  ["Bride Coming from Bride Room", "Emotional moments"],
  ["Bride Groom Temple / Prayer", "Pooja / Prayer"],
  ["Groom Coming from Groom's Room", "Groom prep to entry"],
  ["Thali Kattuthal Wide Shot", "Important moment"],
];
function ShootingChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      shotRows.flatMap((_, r) =>
        Array.from({ length: 6 }, (_, c) => [`${r}-${c}`, r < 3 || c === 0]),
      ),
    ),
  );
  const [remarks, setRemarks] = useState<Record<number, string>>(
    Object.fromEntries(shotRows.map((row, i) => [i, row[1]])),
  );
  const total = shotRows.length * 6,
    complete = Object.values(done).filter(Boolean).length,
    pct = Math.round((complete / total) * 100);
  return (
    <section className="shoot-workspace">
      <div className="shoot-actions">
        <Button variant="outline">
          <Download /> Export PDF
        </Button>
        <Button onClick={() => toast.success("Checklist edit mode enabled")}>
          Edit Checklist
        </Button>
      </div>
      <ShootHeader title="Shooting Checklist" progress={pct} />
      <div className="shoot-kpis">
        {[
          ["Total Shots", shotRows.length],
          [
            "Completed (Photo)",
            shotRows.filter((_, r) => [0, 1, 2].every((c) => done[`${r}-${c}`]))
              .length,
          ],
          [
            "Completed (Video)",
            shotRows.filter((_, r) => [3, 4, 5].every((c) => done[`${r}-${c}`]))
              .length,
          ],
          [
            "Pending Photo",
            total / 2 -
              Object.keys(done).filter(
                (k) => Number(k.split("-")[1]) < 3 && done[k],
              ).length,
          ],
          [
            "Pending Video",
            total / 2 -
              Object.keys(done).filter(
                (k) => Number(k.split("-")[1]) >= 3 && done[k],
              ).length,
          ],
        ].map((x) => (
          <article key={x[0]}>
            <ClipboardCheck />
            <span>
              {x[0]}
              <strong>{x[1]}</strong>
            </span>
          </article>
        ))}
      </div>
      <div className="checklist-card">
        <div className="check-tabs">
          <button className="active">All Shots</button>
          <button>Pending</button>
          <button>Completed</button>
        </div>
        <div className="shoot-table">
          <header>
            <span>#</span>
            <span>Description</span>
            <b>
              Photo
              <br />
              <i>E1　 E2　 E3</i>
            </b>
            <b>
              Video
              <br />
              <i>E1　 E2　 E3</i>
            </b>
            <span>Remarks</span>
          </header>
          {shotRows.map((row, r) => (
            <div key={row[0]}>
              <span>{r + 1}</span>
              <b>{row[0]}</b>
              <section>
                {[0, 1, 2].map((c) => (
                  <Checkbox
                    key={c}
                    checked={done[`${r}-${c}`]}
                    onCheckedChange={(v) =>
                      setDone((p) => ({ ...p, [`${r}-${c}`]: !!v }))
                    }
                  />
                ))}
              </section>
              <section>
                {[3, 4, 5].map((c) => (
                  <Checkbox
                    key={c}
                    checked={done[`${r}-${c}`]}
                    onCheckedChange={(v) =>
                      setDone((p) => ({ ...p, [`${r}-${c}`]: !!v }))
                    }
                  />
                ))}
              </section>
              <input
                className="remark-input"
                value={remarks[r]}
                onChange={(e) =>
                  setRemarks((p) => ({ ...p, [r]: e.target.value }))
                }
                aria-label={`Remarks for ${row[0]}`}
              />
            </div>
          ))}
        </div>
        <footer className="shoot-notes">
          <b>Any Notes: To the Photo & Video Editors</b>
          <span>
            Ensure all key moments are covered. Highlight emotional reactions
            and candid moments.
          </span>
        </footer>
      </div>
    </section>
  );
}
function TeamDashboard({ context }: { context: string }) {
  const [members, setMembers] = useState([
    ...teamMembers,
    { name: "Deepak", role: "Photo Editor", projects: 3, load: 35 },
  ]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Photographer",
    phone: "",
  });
  const roles = [
    "Photographer",
    "Videographer",
    "Photo Editor",
    "Video Editor",
    "Album Designer",
    "Assistant",
  ];
  const addMember = () => {
    if (!form.name) return toast.error("Enter team member name");
    setMembers((p) => [
      ...p,
      { name: form.name, role: form.role, projects: 0, load: 0 },
    ]);
    setForm({ name: "", role: "Photographer", phone: "" });
    setOpen(false);
    toast.success("Team member added");
  };
  const roleCounts = [
    ["Total Team Members", members.length, Users, "All"],
    [
      "Photographers",
      members.filter((m) => m.role === "Photographer").length,
      Camera,
      "Photographer",
    ],
    [
      "Videographers",
      members.filter((m) => m.role === "Videographer").length,
      Video,
      "Videographer",
    ],
    [
      "Editors",
      members.filter((m) => m.role.includes("Editor")).length,
      Monitor,
      "Editor",
    ],
    [
      "Album Designers",
      members.filter((m) => m.role === "Album Designer").length,
      LayoutGrid,
      "Album Designer",
    ],
    [
      "Assistants / Others",
      members.filter((m) => m.role === "Assistant").length,
      UserPlus,
      "Assistant",
    ],
  ] as any[];
  const visible =
    roleFilter === "All"
      ? members
      : roleFilter === "Editor"
        ? members.filter((m) => m.role.includes("Editor"))
        : members.filter((m) => m.role === roleFilter);
  return (
    <section className="team-ops">
      <div className="team-title">
        <div>
          <h2>{context} Team Dashboard</h2>
          <p>
            Overview of team assignments, workload, availability and
            performance.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus /> Add Team Member
        </Button>
      </div>
      {open && (
        <div className="member-modal" role="dialog">
          <button className="modal-scrim" onClick={() => setOpen(false)} />
          <div>
            <header>
              <h2>Add Team Member</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </header>
            <label>
              Name *
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Team member name"
              />
            </label>
            <label>
              Role
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label>
              Phone
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91"
              />
            </label>
            <Button onClick={addMember}>Add Member</Button>
          </div>
        </div>
      )}
      <div className="team-kpis">
        {roleCounts.map(([label, value, Icon, filter]) => (
          <article
            className={roleFilter === filter ? "selected" : ""}
            key={label}
          >
            <Icon />
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <button onClick={() => setRoleFilter(filter)}>View All →</button>
            </div>
          </article>
        ))}
      </div>
      <div className="team-dashboard-grid">
        <article className="team-panel">
          <div className="panel-head">
            <h3>Team Workload Overview</h3>
            <span>{roleFilter}</span>
          </div>
          {visible.length ? (
            visible.map((m) => (
              <div className="workload-row" key={m.name}>
                <span className="mini-avatar">{m.name[0]}</span>
                <div>
                  <b>{m.name}</b>
                  <small>
                    {m.role} · {m.projects} projects
                  </small>
                </div>
                <Progress value={m.load} />
                <strong>{m.load}%</strong>
              </div>
            ))
          ) : (
            <p className="empty-team">
              No members in this role. Use Add Team Member.
            </p>
          )}
        </article>
        <article className="team-panel">
          <div className="panel-head">
            <h3>
              Team Availability <small>This Week</small>
            </h3>
            <button onClick={() => toast.success("Weekly calendar opened")}>
              View Calendar
            </button>
          </div>
          <div className="availability seven-days">
            <header>
              <span>Role</span>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x, i) => (
                <b key={x}>
                  {x}
                  <small>{i + 1}</small>
                </b>
              ))}
            </header>
            {[
              ["Photographers", 4, 3, 2, 2, 3, 2, 1],
              ["Videographers", 3, 3, 2, 2, 3, 2, 1],
              ["Editors", 5, 4, 3, 3, 4, 3, 2],
              ["Album", 2, 2, 1, 1, 2, 1, 1],
              ["Assistants", 4, 4, 4, 4, 4, 4, 4],
            ].map((r: any) => (
              <div key={r[0]}>
                <span>{r[0]}</span>
                {r.slice(1).map((v: number, i: number) => (
                  <b
                    className={v <= 1 ? "busy" : v <= 2 ? "medium" : "good"}
                    key={i}
                  >
                    {v}
                  </b>
                ))}
              </div>
            ))}
          </div>
          <div className="availability-key">
            <span>● Good</span>
            <span>● Moderate</span>
            <span>● Busy</span>
          </div>
        </article>
        <article className="team-panel">
          <div className="panel-head">
            <h3>Upcoming Assignments</h3>
            <button onClick={() => toast.success("All assignments displayed")}>
              View All
            </button>
          </div>
          {[
            ["01 Sep", "Aishwarya & Karandeep", "Chennai"],
            ["02 Sep", "Ramesh & Divya", "Kanchipuram"],
            ["03 Sep", "Suresh & Priya", "Coimbatore"],
            ["04 Sep", "Mohan Family", "Madurai"],
            ["05 Sep", "Vimal & Keerthi", "Trichy"],
          ].map((x) => (
            <div className="upcoming-row" key={x[0]}>
              <b>{x[0]}</b>
              <span>
                {x[1]}
                <small>{x[2]}</small>
              </span>
              <Users />
            </div>
          ))}
        </article>
      </div>
      <div className="team-bottom-grid">
        <article className="team-panel">
          <h3>Team Capacity Distribution</h3>
          <div className="capacity-ring">
            <strong>
              {members.length}
              <small>Total Members</small>
            </strong>
          </div>
          <p>Optimal 50% · Medium 33% · High 17%</p>
        </article>
        <article className="team-panel">
          <h3>Pending Tasks by Team</h3>
          {[
            ["Photo Editors", 23],
            ["Video Editors", 18],
            ["Album Designers", 15],
            ["Assistants", 10],
          ].map((x) => (
            <div className="task-count" key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]} Tasks</b>
            </div>
          ))}
        </article>
        <article className="team-panel">
          <h3>Overloaded Team Members</h3>
          {members
            .filter((m) => m.load >= 50)
            .map((m) => (
              <div className="overload-row" key={m.name}>
                <span>
                  {m.name} · {m.role}
                </span>
                <Progress value={m.load} />
                <b>{m.load}%</b>
              </div>
            ))}
        </article>
      </div>
      <div className="performance-grid">
        <article className="team-panel">
          <div className="panel-head">
            <h3>
              Team Performance <small>This Month</small>
            </h3>
            <button
              onClick={() => toast.success("Full performance report displayed")}
            >
              View Report
            </button>
          </div>
          <div className="performance-table">
            <header>
              <span>Team Member</span>
              <span>Role</span>
              <span>Projects Completed</span>
              <span>On-time Delivery</span>
              <span>Quality Score</span>
              <span>Client Rating</span>
            </header>
            {members.slice(0, 6).map((m, i) => (
              <div key={m.name}>
                <b>{m.name}</b>
                <span>{m.role}</span>
                <strong>{Math.max(2, 8 - i)}</strong>
                <em>{Math.max(88, 100 - i * 3)}%</em>
                <strong>{(4.9 - i * 0.08).toFixed(1)}/5</strong>
                <span className="stars">★★★★★</span>
              </div>
            ))}
          </div>
        </article>
        <article className="team-panel skills-panel">
          <h3>Skills & Roles Summary</h3>
          <div>
            {[
              ["Photo Editing", 7],
              ["Video Editing", 4],
              ["Album Design", 3],
              ["Cinematography", 6],
              ["Drone Pilot", 3],
              ["Other Roles", 1],
            ].map((x) => (
              <button
                key={x[0]}
                onClick={() => toast.success(`${x[0]} members displayed`)}
              >
                <ClipboardCheck />
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
                <small>Members</small>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
function TeamOperations({ view, context }: { view: string; context: string }) {
  const [assigned, setAssigned] = useState<Record<string, string>>({
    "Lead Photographer": "Karthik",
    Cinematographer: "Vignesh",
    "Drone Operator": "Ajay",
    "Photo Editor": "Arul",
  });
  const [blocked, setBlocked] = useState<number[]>([]);
  const [calendarMode, setCalendarMode] = useState<"Day" | "Week" | "Month">(
    "Month",
  );
  const [selectedLead, setSelectedLead] = useState(deliveryLeads[0].id);
  if (view === "Team Dashboard")
    return context === "Production" ? (
      <TeamDashboard context={context} />
    ) : (
      <>
        <LeadTrackerHeader
          selected={selectedLead}
          setSelected={setSelectedLead}
          label={`${context.toUpperCase()} TEAM PROJECT`}
        />
        <TeamDashboard context={context} />
      </>
    );
  const assign = (role: string) => {
    const available = ["Suresh", "Deepak", "Vijay", "Kavin", "Harish"];
    setAssigned((p) => ({
      ...p,
      [role]: available[Object.keys(p).length % available.length],
    }));
    toast.success(`${role} assigned`);
  };
  if (view === "Calendar")
    return (
      <section className="team-ops">
        <div className="team-title">
          <div>
            <h2>{context} Calendar Blocking</h2>
            <p>
              Block dates and coordinate shoots, editing work and team
              availability.
            </p>
          </div>
          <Button
            onClick={() => {
              const next = blocked.includes(8) ? 16 : 8;
              setBlocked([...blocked, next]);
              toast.success(`September ${next} blocked`);
            }}
          >
            <Plus /> Block Date
          </Button>
        </div>
        <div className="calendar-card">
          <div className="calendar-toolbar">
            <Button variant="outline">Today</Button>
            <h3>September 2026</h3>
            <div>
              {(["Day", "Week", "Month"] as const).map((mode) => (
                <button
                  key={mode}
                  className={calendarMode === mode ? "active" : ""}
                  onClick={() => setCalendarMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          {calendarMode !== "Month" && (
            <div className={`calendar-${calendarMode.toLowerCase()}-view`}>
              {(calendarMode === "Day"
                ? [15]
                : [13, 14, 15, 16, 17, 18, 19]
              ).map((day) => (
                <article key={day}>
                  <header>
                    <b>{day} Sep</b>
                    <span>
                      {
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                          day % 7
                        ]
                      }
                    </span>
                  </header>
                  <div>
                    <time>09:00 AM</time>
                    <section>
                      <b>{calendarEvents[day]?.[0] || "Team available"}</b>
                      <span>
                        {calendarEvents[day]?.[1] || "No assignment scheduled"}
                      </span>
                    </section>
                  </div>
                  <div>
                    <time>02:00 PM</time>
                    <section className="available-slot">
                      Available for assignment
                    </section>
                  </div>
                </article>
              ))}
            </div>
          )}
          {calendarMode === "Month" && (
            <>
              <div className="calendar-week">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((x) => (
                  <b key={x}>{x}</b>
                ))}
              </div>
            </>
          )}
          <div className="calendar-grid">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 1;
              const event = calendarEvents[day];
              return (
                <button
                  key={i}
                  className={blocked.includes(day) ? "blocked" : ""}
                  onClick={() =>
                    day > 0 &&
                    setBlocked((p) =>
                      p.includes(day)
                        ? p.filter((x) => x !== day)
                        : [...p, day],
                    )
                  }
                >
                  <span>{day > 0 && day <= 30 ? day : ""}</span>
                  {event && (
                    <div style={{ "--event": event[2] } as any}>
                      <b>{event[0]}</b>
                      <small>{event[1]}</small>
                      <em>
                        <Clock /> 6:00 PM onwards
                      </em>
                    </div>
                  )}
                  {blocked.includes(day) && <i>Blocked</i>}
                </button>
              );
            })}
          </div>
          <footer className="calendar-legend">
            <span>● Wedding</span>
            <span>● Pre-Wedding</span>
            <span>● Reception</span>
            <span>● Engagement</span>
            <span>● Blocked</span>
          </footer>
        </div>
      </section>
    );
  if (view === "Team & Allocation") {
    const lead = deliveryLeads.find((item) => item.id === selectedLead)!;
    const pct = Math.round(
      (Object.keys(assigned).length / assignmentRoles.length) * 100,
    );
    return (
      <section className="team-ops">
        <LeadTrackerHeader
          selected={selectedLead}
          setSelected={setSelectedLead}
          label={`${context.toUpperCase()} TEAM PROJECT`}
        />
        <div className="team-title">
          <div>
            <h2>{context} Team Assignment</h2>
            <p>Assign members and manage roles for {lead.couple}.</p>
          </div>
          <Button
            onClick={() =>
              assignmentRoles.filter((r) => !assigned[r]).forEach(assign)
            }
          >
            <Sparkles /> Auto Suggest
          </Button>
        </div>
        <div className="assignment-project">
          <div>
            <span className="project-avatar">
              {lead.couple
                .split(" ")
                .filter((x) => x !== "&")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <h2>
                {lead.couple} <em>Upcoming</em>
              </h2>
              <p>
                <CalendarDays /> {lead.date} &nbsp; <MapPin /> {lead.venue}{" "}
                &nbsp;
                {lead.package}
              </p>
            </div>
          </div>
          <strong>
            {pct}%<small>Team Assigned</small>
          </strong>
        </div>
        <div className="assignment-layout">
          <article className="team-panel">
            <h3>Assigned Team</h3>
            <p>
              Assign members to specific production and post-production roles.
            </p>
            <div className="assignment-table">
              <header>
                <span>Role</span>
                <span>Assigned To</span>
                <span>Status</span>
                <span>Action</span>
              </header>
              {assignmentRoles.map((role) => (
                <div key={role}>
                  <b>{role}</b>
                  <span>{assigned[role] || "Not Assigned"}</span>
                  <em className={assigned[role] ? "ok" : "pending"}>
                    {assigned[role] ? "Assigned" : "Pending"}
                  </em>
                  <button
                    onClick={() =>
                      assigned[role]
                        ? setAssigned((p) => {
                            const n = { ...p };
                            delete n[role];
                            return n;
                          })
                        : assign(role)
                    }
                  >
                    {assigned[role] ? "Remove" : "Assign"}
                  </button>
                </div>
              ))}
            </div>
          </article>
          <aside className="team-panel available-team">
            <h3>Available Team</h3>
            {[
              "Suresh · Photographer",
              "Deepak · Cinematographer",
              "Vijay · Assistant",
              "Kavin · Lighting Assistant",
              "Harish · Drone Operator",
            ].map((x) => (
              <div key={x}>
                <span className="mini-avatar">{x[0]}</span>
                <b>{x}</b>
                <button
                  onClick={() => toast.success(`${x.split(" · ")[0]} selected`)}
                >
                  Select
                </button>
              </div>
            ))}
          </aside>
        </div>
        <div className="assignment-summary">
          {[
            ["Total Roles", assignmentRoles.length],
            ["Assigned", Object.keys(assigned).length],
            ["Pending", assignmentRoles.length - Object.keys(assigned).length],
            ["Availability", "Good"],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <strong>{x[1]}</strong>
            </article>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="team-ops">
      <div className="team-title">
        <div>
          <h2>{context} Team Dashboard</h2>
          <p>
            Overview of team assignments, workload, availability and
            performance.
          </p>
        </div>
        <Button>
          <UserPlus /> Add Team Member
        </Button>
      </div>
      <div className="team-kpis">
        {[
          ["Total Team Members", 24, Users],
          ["Photographers", 6, Camera],
          ["Videographers", 4, Video],
          ["Editors", 7, Monitor],
          ["Album Designers", 3, LayoutGrid],
          ["Assistants / Others", 4, UserPlus],
        ].map(([label, value, Icon]: any) => (
          <article key={label}>
            <Icon />
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>View all →</span>
            </div>
          </article>
        ))}
      </div>
      <div className="team-dashboard-grid">
        <article className="team-panel">
          <h3>Team Workload Overview</h3>
          {teamMembers.map((m) => (
            <div className="workload-row" key={m.name}>
              <span className="mini-avatar">{m.name[0]}</span>
              <div>
                <b>{m.name}</b>
                <small>
                  {m.role} · {m.projects} projects
                </small>
              </div>
              <Progress value={m.load} />
              <strong>{m.load}%</strong>
            </div>
          ))}
        </article>
        <article className="team-panel">
          <h3>
            Team Availability <small>This Week</small>
          </h3>
          <div className="availability">
            <header>
              <span>Role</span>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((x) => (
                <b key={x}>{x}</b>
              ))}
            </header>
            {[
              ["Photo", 4, 3, 2, 2, 3],
              ["Video", 3, 3, 2, 2, 3],
              ["Editors", 5, 4, 3, 3, 4],
              ["Albums", 2, 2, 1, 1, 2],
            ].map((r: any) => (
              <div key={r[0]}>
                <span>{r[0]}</span>
                {r.slice(1).map((v: number, i: number) => (
                  <b
                    className={v <= 1 ? "busy" : v <= 2 ? "medium" : "good"}
                    key={i}
                  >
                    {v}
                  </b>
                ))}
              </div>
            ))}
          </div>
        </article>
        <article className="team-panel">
          <h3>Upcoming Assignments</h3>
          {[
            ["01 Sep", "Aishwarya & Karandeep", "Chennai"],
            ["02 Sep", "Ramesh & Divya", "Kanchipuram"],
            ["03 Sep", "Suresh & Priya", "Coimbatore"],
            ["05 Sep", "Vimal & Keerthi", "Trichy"],
          ].map((x) => (
            <div className="upcoming-row" key={x[0]}>
              <b>{x[0]}</b>
              <span>
                {x[1]}
                <small>{x[2]}</small>
              </span>
              <Users />
            </div>
          ))}
        </article>
      </div>
      <div className="team-bottom-grid">
        <article className="team-panel">
          <h3>Team Capacity</h3>
          <div className="capacity-ring">
            <strong>
              24<small>Members</small>
            </strong>
          </div>
          <p>12 Optimal · 8 Medium · 4 High</p>
        </article>
        <article className="team-panel">
          <h3>Pending Tasks by Team</h3>
          {[
            ["Photo Editors", 23],
            ["Video Editors", 18],
            ["Album Designers", 15],
            ["Assistants", 10],
          ].map((x) => (
            <div className="task-count" key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]} tasks</b>
            </div>
          ))}
        </article>
        <article className="team-panel">
          <h3>Overloaded Team Members</h3>
          {teamMembers.slice(0, 3).map((m) => (
            <div className="overload-row" key={m.name}>
              <span>
                {m.name} · {m.role}
              </span>
              <Progress value={m.load} />
              <b>{m.load}%</b>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
function Project() {
  return (
    <div
      className="banner platform-project"
      onClick={() => openPlatformLead("Aakash & Anu")}
    >
      <div>
        <small>ACTIVE SHOOT</small>
        <h2>Aakash & Anu — Wedding</h2>
        <p>21 September · Madurai · Project FS-2409</p>
      </div>
      <Button variant="outline">Change Project</Button>
    </div>
  );
}

function ProductionSubsection({ title }: { title: string }) {
  const [selected, setSelected] = useState(deliveryLeads[0].id);
  const lead =
    deliveryLeads.find((item) => item.id === selected) || deliveryLeads[0];
  const content: Record<string, string[]> = {
    "Hard Disk Tracking": [
      "Client HDD received",
      "Disk capacity verified",
      "Disk label recorded",
      "Return acknowledgement pending",
    ],
    Storage: [
      "Files copied to NAS Studio Server",
      "Google Drive backup",
      "WD My Cloud backup",
      "Dropbox cloud backup",
    ],
    "Completed Shoots": [
      "Crew checkout completed",
      "Equipment returned",
      "Footage count verified",
      "Post Production handover",
    ],
  };
  const tasks = content[title] || production.flatMap((group: any) => group[1]);
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(tasks.map((item, i) => [item, i < 2])),
  );
  const pct = Math.round(
    (Object.values(done).filter(Boolean).length / tasks.length) * 100,
  );
  return (
    <section className="production-subsection">
      <LeadTrackerHeader
        selected={selected}
        setSelected={setSelected}
        label="PRODUCTION SHOOT PROJECT"
      />
      <div className="subsection-client">
        <div className="project-avatar">
          {lead.couple
            .split(/\s|&/)
            .filter(Boolean)
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h2>{lead.couple}</h2>
          <p>
            {lead.event} · {lead.date} · {lead.venue}
          </p>
        </div>
        <strong>{pct}% complete</strong>
      </div>
      <article>
        <header>
          <div>
            <small>PRODUCTION - SHOOT</small>
            <h2>{title}</h2>
          </div>
          <Button onClick={() => toast.success(`${title} entry added`)}>
            <Plus /> Add New
          </Button>
        </header>
        <Progress value={pct} />
        <div>
          {tasks.map((item) => (
            <label key={item}>
              <Checkbox
                checked={!!done[item]}
                onCheckedChange={(value) =>
                  setDone((p) => ({ ...p, [item]: !!value }))
                }
              />
              <span>{item}</span>
              <b>{done[item] ? "Completed" : "Pending"}</b>
            </label>
          ))}
        </div>
      </article>
    </section>
  );
}

const productionClients = [
  {
    id: "FS-2409",
    name: "Aakash & Anu",
    date: "21 Sep 2026",
    location: "Madurai",
    event: "Wedding",
    package: "Signature Wedding Package",
    owner: "Karthik",
  },
  {
    id: "FS-2398",
    name: "Naveen & Aarthi",
    date: "14 Sep 2026",
    location: "Chennai",
    event: "Wedding + Reception",
    package: "Premium Photography & Film",
    owner: "Amrutha",
  },
  {
    id: "FS-2385",
    name: "Rohan & Sneha",
    date: "08 Sep 2026",
    location: "ECR",
    event: "Wedding Film",
    package: "Cinematic Film Package",
    owner: "Vignesh",
  },
];

function ProductionShootOverview() {
  const [clientId, setClientId] = useState(productionClients[0].id);
  const [equipment, setEquipment] = useState([
    true,
    true,
    true,
    true,
    false,
    true,
    true,
  ]);
  const [shots, setShots] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    true,
  ]);
  const client =
    productionClients.find((item) => item.id === clientId) ||
    productionClients[0];
  const equipmentPct = Math.round(
    (equipment.filter(Boolean).length / equipment.length) * 100,
  );
  const shotPct = Math.round(
    (shots.filter(Boolean).length / shots.length) * 100,
  );
  const toggle = (setter: any, values: boolean[], index: number) =>
    setter(values.map((value, i) => (i === index ? !value : value)));
  const equipmentLabels = [
    "Cameras",
    "Lenses",
    "Gimbals / Stabilizers",
    "Drones",
    "Audio Equipment",
    "Lighting",
    "Accessories",
  ];
  const shotLabels = [
    "Venue Scouting",
    "Shot List Planning",
    "Family List",
    "Candid Plan",
    "Ceremony Key Moments",
    "Detail Shots",
    "Rain / Emergency Plan",
  ];
  return (
    <section className="production-overview">
      <div className="production-selector">
        <div>
          <small>PRODUCTION PROJECT</small>
          <h2>{client.name}</h2>
          <p>
            {client.event} · {client.date} · {client.location}
          </p>
        </div>
        <label>
          <span>Select lead / project</span>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            {productionClients.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <article
        className="production-client"
        onClick={() => openPlatformLead(client.name)}
      >
        <div className="project-avatar">
          {client.name
            .split(/\s|&/)
            .filter(Boolean)
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <small>CLIENT & PROJECT</small>
          <h2>
            {client.name} <em>Booked</em>
          </h2>
          <p>Click to open complete lead details</p>
        </div>
        {[
          ["Wedding Date", client.date],
          ["Location", client.location],
          ["Event Type", client.event],
          ["Package", client.package],
          ["Project Owner", client.owner],
        ].map(([label, value]) => (
          <div className="client-fact" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </article>
      <div className="production-tabs">
        {[
          "Overview",
          "Calendar",
          "Team",
          "Equipment",
          "Checklists",
          "Hard Disk",
          "Storage",
          "Activity",
        ].map((item, i) => (
          <button
            className={i === 0 ? "active" : ""}
            key={item}
            onClick={() =>
              toast.success(`${item} opened from the Production menu`)
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="production-grid">
        <article className="overview-panel calendar-summary">
          <header>
            <h3>Calendar Blocking</h3>
            <button onClick={() => toast.success("Production calendar opened")}>
              View Calendar
            </button>
          </header>
          <div className="mini-calendar">
            <b>September 2026</b>
            <div className="weekdays">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            <div className="days">
              {Array.from({ length: 30 }, (_, i) => (
                <button className={i + 1 === 21 ? "selected" : ""} key={i}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <ul className="event-list">
            <li>
              <i className="gold-dot" />
              Mehendi · 19 Sep, 4:00 PM
            </li>
            <li>
              <i className="blue-dot" />
              Sangeet · 20 Sep, 7:00 PM
            </li>
            <li>
              <i className="red-dot" />
              Wedding · 21 Sep, 6:00 AM
            </li>
          </ul>
        </article>
        <article className="overview-panel">
          <header>
            <h3>Team Assignment</h3>
            <button onClick={() => toast.success("Team allocation opened")}>
              Manage Team
            </button>
          </header>
          {[
            ["Karthik", "Lead Photographer"],
            ["Vignesh", "Cinematographer"],
            ["Manoj", "Second Photographer"],
            ["Ajay", "Drone Operator"],
            ["Rohit", "Lighting Incharge"],
          ].map(([name, role]) => (
            <div className="team-summary-row" key={name}>
              <i>{name[0]}</i>
              <b>{name}</b>
              <span>{role}</span>
              <Phone />
            </div>
          ))}
          <button
            className="panel-add"
            onClick={() => toast.success("Add team member form opened")}
          >
            <Plus /> Add Member
          </button>
        </article>
        <article className="overview-panel">
          <header>
            <h3>Equipment Checklist</h3>
            <b>{equipmentPct}%</b>
          </header>
          {equipmentLabels.map((label, i) => (
            <label className="overview-check" key={label}>
              <Checkbox
                checked={equipment[i]}
                onCheckedChange={() => toggle(setEquipment, equipment, i)}
              />
              <span>{label}</span>
              <b>{equipment[i] ? "Ready" : "Pending"}</b>
            </label>
          ))}
          <Progress value={equipmentPct} />
        </article>
        <article className="overview-panel">
          <header>
            <h3>Shooting Checklist</h3>
            <b>{shotPct}%</b>
          </header>
          {shotLabels.map((label, i) => (
            <label className="overview-check" key={label}>
              <Checkbox
                checked={shots[i]}
                onCheckedChange={() => toggle(setShots, shots, i)}
              />
              <span>{label}</span>
              <b>{shots[i] ? "Done" : "Pending"}</b>
            </label>
          ))}
        </article>
        <article className="overview-panel hard-disk-panel">
          <header>
            <h3>Client Hard Disk Tracking</h3>
            <button onClick={() => toast.success("New hard disk entry ready")}>
              Add New
            </button>
          </header>
          <div className="compact-table">
            <b>Disk Label</b>
            <b>Capacity</b>
            <b>Status</b>
            <b>Received</b>
            {[
              ["Disk 1", "4 TB", "Received", "22 Sep"],
              ["Disk 2", "4 TB", "Received", "22 Sep"],
              ["Disk 3", "4 TB", "Pending", "—"],
              ["Disk 4", "2 TB", "Pending", "—"],
            ].flatMap((row) =>
              row.map((cell) => <span key={`${row[0]}-${cell}`}>{cell}</span>),
            )}
          </div>
        </article>
        <article className="overview-panel">
          <header>
            <h3>File Storage Location</h3>
            <button
              onClick={() => toast.success("Storage details can now be edited")}
            >
              Edit
            </button>
          </header>
          {[
            ["Primary Storage", "NAS Studio Server"],
            ["Backup Storage 1", "Google Drive (Studio)"],
            ["Backup Storage 2", "WD My Cloud EX4100"],
            ["Cloud Backup", "Dropbox Business"],
          ].map(([label, value]) => (
            <div className="storage-row" key={label}>
              <Monitor />
              <span>
                {label}
                <b>{value}</b>
              </span>
            </div>
          ))}
        </article>
      </div>
      <article className="event-status">
        <h3>Event Completion Status</h3>
        <div>
          {[
            ["Mehendi", "Completed"],
            ["Sangeet", "Completed"],
            ["Wedding", "In Progress"],
            ["Reception", "Upcoming"],
            ["Final Handover", "Pending"],
          ].map(([event, status], i) => (
            <section
              className={i < 2 ? "done" : i === 2 ? "current" : ""}
              key={event}
            >
              <i>
                <CheckCircle2 />
              </i>
              <b>{event}</b>
              <span>{status}</span>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
function Groups({ groups }: any) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <div className="groups">
      {groups.map((g: any) => (
        <article key={g[0]}>
          <h3>
            <CheckCircle2 />
            {g[0]}
          </h3>
          {g[1].map((x: string) => (
            <label key={x}>
              <Checkbox
                checked={!!done[x]}
                onCheckedChange={(v) => setDone({ ...done, [x]: !!v })}
              />
              <span>{x}</span>
            </label>
          ))}
        </article>
      ))}
    </div>
  );
}
const deliveryLeads = [
  {
    id: "FS-2409",
    couple: "Aakash & Anu",
    event: "Wedding",
    date: "21 September 2026",
    venue: "Madurai",
    package: "Signature Wedding Package",
  },
  {
    id: "FS-2398",
    couple: "Naveen & Aarthi",
    event: "Wedding + Reception",
    date: "14 September 2026",
    venue: "Chennai",
    package: "Premium Photography & Film",
  },
  {
    id: "FS-2385",
    couple: "Rohan & Sneha",
    event: "Wedding Film",
    date: "08 September 2026",
    venue: "ECR",
    package: "Cinematic Film Package",
  },
];
const deliveryGroups = [
  [
    "Gallery",
    [
      "Client Guest Access Shared",
      "RAW Gallery Sent for Photo Selection",
      "Highlight Pictures Delivery",
    ],
  ],
  ["Album Design", ["Virtual Album Shared", "Delivered to Client"]],
  ["Traditional Video", ["Link Shared", "Copied to Client HDD"]],
  [
    "Wedding Film",
    [
      "YT Link Shared",
      "Shared final version to Client",
      "Copied to Client HDD",
    ],
  ],
] as const;
function Deliveries() {
  const [selected, setSelected] = useState(deliveryLeads[0].id);
  const [section, setSection] = useState("Overview");
  const [tracking, setTracking] = useState<
    Record<string, Record<string, boolean>>
  >({
    "FS-2409": {
      "Gallery:Client Guest Access Shared": true,
      "Gallery:RAW Gallery Sent for Photo Selection": true,
      "Album Design:Virtual Album Shared": true,
      "Wedding Film:YT Link Shared": true,
    },
  });
  const lead = deliveryLeads.find((x) => x.id === selected)!;
  const checked = tracking[selected] || {};
  const allKeys = deliveryGroups.flatMap(([name, items]) =>
    items.map((item) => `${name}:${item}`),
  );
  const completed = allKeys.filter((key) => checked[key]).length;
  const overall = Math.round((completed / allKeys.length) * 100);
  const toggle = (key: string, value: boolean) =>
    setTracking((p) => ({
      ...p,
      [selected]: { ...(p[selected] || {}), [key]: value },
    }));
  const deliveryNav = [
    "Overview",
    "Highlights Photos",
    "Final Photos",
    "Highlight Film",
    "Full Film",
    "Album Delivery",
    "Hard Disk Return",
  ];
  const deliveryCards = [
    ["Highlights Photos", 100, "Delivered", "31 Jan 2027"],
    ["Final Photos", 58, "In Progress", "22 Feb 2027"],
    ["Highlight Film", 40, "Editing", "02 Feb 2027"],
    ["Full Film", 20, "In Progress", "05 Feb 2027"],
    ["Album Delivery", 0, "Pending", "10 Feb 2027"],
    ["Hard Disk Return", 0, "Pending", "15 Feb 2027"],
  ] as const;
  return (
    <section className="delivery-page">
      <LeadTrackerHeader
        selected={selected}
        setSelected={setSelected}
        label="DELIVERY PROJECT"
      />
      <div className="module-nav">
        {deliveryNav.map((x) => (
          <button
            key={x}
            className={section === x ? "active" : ""}
            onClick={() => setSection(x)}
          >
            {x}
          </button>
        ))}
      </div>
      {section === "Overview" ? (
        <>
          <OverallTracker
            title="Overall Delivery Completion"
            complete={completed}
            total={allKeys.length}
            couple={lead.couple}
          />
          <div className="delivery-status-cards">
            {deliveryCards.map(([name, pct, status, due]) => (
              <article key={name} onClick={() => setSection(name)}>
                <CheckCircle2 />
                <div>
                  <b>{name}</b>
                  <em>{status}</em>
                  <Progress value={pct} />
                  <small>{pct ? `${pct}% completed` : `Due: ${due}`}</small>
                </div>
              </article>
            ))}
          </div>
          <div className="delivery-dashboard-grid">
            <article className="business-panel delivery-timeline">
              <h3>Delivery Timeline (45 Days)</h3>
              {deliveryCards.map(([name, pct, status, due]) => (
                <div key={name}>
                  <i className={pct === 100 ? "done" : pct ? "current" : ""} />
                  <span>
                    <b>{name}</b>
                    <small>
                      {status} · {due}
                    </small>
                  </span>
                </div>
              ))}
            </article>
            <article className="business-panel delivery-pipeline">
              <h3>Delivery Pipeline</h3>
              <div>
                {[
                  "Not Started",
                  "In Progress",
                  "Client Review",
                  "Ready to Deliver",
                  "Delivered",
                ].map((stage, i) => (
                  <section key={stage}>
                    <b>{stage}</b>
                    {deliveryCards
                      .filter((_, j) => Math.min(j, 4) === i)
                      .map(([n, p]) => (
                        <button key={n} onClick={() => setSection(n)}>
                          {n}
                          <Progress value={p} />
                        </button>
                      ))}
                  </section>
                ))}
              </div>
            </article>
            <article className="business-panel">
              <h3>Delivery Alerts</h3>
              {deliveryCards.slice(1, 4).map(([n, , s, d]) => (
                <button
                  className="alert-row"
                  key={n}
                  onClick={() => setSection(n)}
                >
                  <span>
                    {n}
                    <small>{s}</small>
                  </span>
                  <b>{d}</b>
                </button>
              ))}
              <Button
                variant="outline"
                onClick={() => toast.success("All delivery alerts opened")}
              >
                View All Alerts
              </Button>
            </article>
          </div>
          <div className="delivery-grid">
            {deliveryGroups.map(([name, items]) => {
              const complete = items.filter(
                (item) => checked[`${name}:${item}`],
              ).length;
              const percent = Math.round((complete / items.length) * 100);
              return (
                <article key={name}>
                  <div className="delivery-card-head">
                    <div>
                      <CheckCircle2 />
                      <h3>{name}</h3>
                    </div>
                    <strong>{percent}%</strong>
                  </div>
                  <Progress value={percent} />
                  {items.map((item) => {
                    const itemKey = `${name}:${item}`;
                    return (
                      <label key={itemKey}>
                        <Checkbox
                          checked={!!checked[itemKey]}
                          onCheckedChange={(v) => toggle(itemKey, !!v)}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className="business-detail">
          <header>
            <div>
              <small>DELIVERABLE</small>
              <h2>{section}</h2>
              <p>
                Update production, review, approval and delivery for{" "}
                {lead.couple}.
              </p>
            </div>
            <Button onClick={() => toast.success(`${section} item added`)}>
              <Plus /> Add Item
            </Button>
          </header>
          {[
            "Production completed",
            "Quality check completed",
            "Client preview shared",
            "Client approval received",
            "Final files delivered",
          ].map((task, i) => {
            const itemKey = `${section}:${task}`;
            return (
              <label key={task}>
                <Checkbox
                  checked={!!checked[itemKey]}
                  onCheckedChange={(v) => toggle(itemKey, !!v)}
                />
                <span>
                  <b>{task}</b>
                  <small>
                    {i < 2 ? "Internal team" : "Client-facing milestone"}
                  </small>
                </span>
                <Input
                  defaultValue={i === 4 ? "Final delivery notes" : ""}
                  placeholder="Add notes"
                />
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}
const socialTasks: Record<string, string[]> = {
  "Content Selection": [
    "Shortlist wedding moments",
    "Select hero photographs",
    "Confirm client consent",
  ],
  "Reel Production": [
    "Select reel concept",
    "Complete vertical edit",
    "Add music, captions and logo",
    "Export final reel",
  ],
  "Carousel Production": [
    "Select carousel frames",
    "Design cover slide",
    "Complete colour consistency",
    "Export carousel",
  ],
  "YouTube Videos": [
    "Complete long-form edit",
    "Create thumbnail",
    "Add title and description",
    "Schedule upload",
  ],
  "Client Approval": [
    "Share preview with client",
    "Record client feedback",
    "Complete revisions",
    "Receive final approval",
  ],
  "Publishing Calendar": [
    "Choose publishing date",
    "Schedule Instagram content",
    "Schedule YouTube content",
    "Confirm post published",
  ],
  "Performance Tracking": [
    "Record reach and views",
    "Record saves and shares",
    "Track enquiries generated",
    "Prepare performance summary",
  ],
};
const clientStatusTasks: Record<string, string[]> = {
  Album: [
    "Virtual Album Shared",
    "AL-1 Feedback Received",
    "AL-2 Shared",
    "AL-3 Shared",
    "Approved for Printing",
    "Delivered to Client",
  ],
  "Traditional Video": [
    "Editing Completed",
    "Preview Link Shared",
    "Client Feedback Received",
    "Final Link Shared",
    "Copied to Client HDD",
  ],
  "Wedding Film": [
    "YT Link Shared",
    "RV-1 Completed",
    "RV-2 Completed",
    "RV-3 Completed",
    "Final Version Shared",
    "Copied to Client HDD",
  ],
};
function LeadTrackerHeader({ selected, setSelected, label }: any) {
  const lead = deliveryLeads.find((x) => x.id === selected)!;
  return (
    <div className="delivery-lead tracker-lead">
      <button
        className="lead-identity platform-lead-link"
        onClick={() => openPlatformLead(lead.couple)}
        aria-label={`Open ${lead.couple} details`}
      >
        <span className="lead-avatar">
          {lead.couple
            .split(" ")
            .filter((x: string) => x !== "&")
            .map((x: string) => x[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div>
          <small>
            {label} · {lead.id}
          </small>
          <h2>{lead.couple}</h2>
          <p>
            {lead.event} · {lead.date} · {lead.venue}
          </p>
          <b>{lead.package}</b>
        </div>
      </button>
      <div className="lead-switch">
        <label>Track another lead</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {deliveryLeads.map((x) => (
            <option key={x.id} value={x.id}>
              {x.couple} · {x.id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
function OverallTracker({ title, complete, total, couple, tone }: any) {
  const percent = total ? Math.round((complete / total) * 100) : 0;
  return (
    <div className={`overall-progress tracker-overall ${tone || ""}`}>
      <div>
        <span>{title}</span>
        <strong>{percent}%</strong>
      </div>
      <Progress value={percent} />
      <small>
        {complete} of {total} total actions completed for {couple}
      </small>
    </div>
  );
}
function SocialMedia() {
  const [selectedLead, setSelectedLead] = useState(deliveryLeads[0].id);
  const [section, setSection] = useState("Dashboard");
  const [tracking, setTracking] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const key = `${selectedLead}:${section}`,
    done = tracking[key] || {},
    tasks = socialTasks[section] || [],
    complete = tasks.filter((x) => done[x]).length,
    percent = Math.round((complete / tasks.length) * 100),
    allTasks = Object.values(socialTasks).flat(),
    overallComplete = Object.entries(socialTasks).reduce(
      (sum, [group, items]) =>
        sum +
        items.filter((task) => tracking[`${selectedLead}:${group}`]?.[task])
          .length,
      0,
    ),
    couple = deliveryLeads.find((x) => x.id === selectedLead)?.couple;
  const toggle = (task: string, v: boolean) =>
    setTracking((p) => ({ ...p, [key]: { ...(p[key] || {}), [task]: v } }));
  return (
    <section>
      <LeadTrackerHeader
        selected={selectedLead}
        setSelected={setSelectedLead}
        label="SOCIAL MEDIA PROJECT"
      />
      <div className="permission-banner">
        <CheckCircle2 />
        <div>
          <b>Content Rights & Publishing Permission</b>
          <strong>APPROVED</strong>
          <p>Instagram · YouTube · Website · Ads / Promotions allowed</p>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.success("Permission details opened")}
        >
          View Details
        </Button>
      </div>
      <div className="module-nav social-module-nav">
        {["Dashboard", "Content Rights & Permission", ...socialMenu].map(
          (x, i) => (
            <button
              key={x}
              className={section === x ? "active" : ""}
              onClick={() => setSection(x)}
            >
              {x}
            </button>
          ),
        )}
      </div>
      {section === "Dashboard" ? (
        <>
          <div className="social-kpis">
            {[
              ["Content Assets Ready", "78", "Photos & videos"],
              ["Reels Ready", "5", "of 8 reels"],
              ["Carousels Ready", "3", "of 6 sets"],
              ["YouTube Content", "1", "of 2 videos"],
              ["Posts Scheduled", "12", "this month"],
              ["Total Reach", "2.8M", "↑ 24.6%"],
            ].map(([a, b, c]) => (
              <article key={a}>
                <Sparkles />
                <span>
                  <small>{a}</small>
                  <b>{b}</b>
                  <em>{c}</em>
                </span>
              </article>
            ))}
          </div>
          <div className="social-dashboard-grid">
            {socialMenu.slice(0, 6).map((name, i) => (
              <article className="business-panel" key={name}>
                <header>
                  <b>
                    {i + 1}. {name}
                  </b>
                  <button onClick={() => setSection(name)}>View All</button>
                </header>
                {socialTasks[name].slice(0, 4).map((task, j) => (
                  <div className="social-row" key={task}>
                    <span className="mini-avatar">{j + 1}</span>
                    <b>{task}</b>
                    <em>
                      {j === 0 ? "Ready" : j === 1 ? "In Progress" : "Pending"}
                    </em>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setSection(name)}>
                  Open {name}
                </Button>
              </article>
            ))}
          </div>
          <article className="business-panel performance-panel">
            <header>
              <h3>Performance Tracking</h3>
              <button onClick={() => setSection("Performance Tracking")}>
                View Details
              </button>
            </header>
            <div>
              {[
                ["Total Reach", "280K"],
                ["Impressions", "650K"],
                ["Engagement", "32.4K"],
                ["Saves", "4.2K"],
              ].map(([a, b]) => (
                <span key={a}>
                  <small>{a}</small>
                  <b>{b}</b>
                  <em>↑ 18.7%</em>
                </span>
              ))}
            </div>
          </article>
        </>
      ) : section === "Content Rights & Permission" ? (
        <div className="business-detail">
          <header>
            <div>
              <small>CLIENT CONSENT</small>
              <h2>Content Rights & Permission</h2>
              <p>Control where content from {couple} may be published.</p>
            </div>
          </header>
          {[
            "Instagram publishing",
            "YouTube publishing",
            "Website portfolio",
            "Ads and promotions",
          ].map((task) => (
            <label key={task}>
              <Checkbox defaultChecked />
              <span>
                <b>{task}</b>
                <small>Approved by client</small>
              </span>
              <Input defaultValue="Approved" />
            </label>
          ))}
        </div>
      ) : (
        <div className="single-tracker social-tracker">
          <div className="tracker-heading">
            <div>
              <small>SOCIAL MEDIA</small>
              <h2>{section}</h2>
              <p>Track this activity separately for {couple}.</p>
            </div>
            <strong>{percent}%</strong>
          </div>
          <Progress value={percent} />
          <span className="tracker-count">
            {complete} of {tasks.length} actions completed
          </span>
          {tasks.map((task) => (
            <label key={task}>
              <Checkbox
                checked={!!done[task]}
                onCheckedChange={(v) => toggle(task, !!v)}
              />
              <span>{task}</span>
            </label>
          ))}
          <Button onClick={() => toast.success(`${section} item added`)}>
            <Plus /> Add New
          </Button>
        </div>
      )}
    </section>
  );
}
function ClientStatusTracker() {
  const [selectedLead, setSelectedLead] = useState(deliveryLeads[0].id);
  const [section, setSection] = useState(statusMenu[0]);
  const [tracking, setTracking] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const key = `${selectedLead}:${section}`,
    done = tracking[key] || {},
    tasks = clientStatusTasks[section],
    complete = tasks.filter((x) => done[x]).length,
    percent = Math.round((complete / tasks.length) * 100),
    allTasks = Object.values(clientStatusTasks).flat(),
    overallComplete = Object.entries(clientStatusTasks).reduce(
      (sum, [group, items]) =>
        sum +
        items.filter((task) => tracking[`${selectedLead}:${group}`]?.[task])
          .length,
      0,
    ),
    couple = deliveryLeads.find((x) => x.id === selectedLead)?.couple;
  const toggle = (task: string, v: boolean) =>
    setTracking((p) => ({ ...p, [key]: { ...(p[key] || {}), [task]: v } }));
  return (
    <section>
      <LeadTrackerHeader
        selected={selectedLead}
        setSelected={setSelectedLead}
        label="CLIENT STATUS"
      />
      <OverallTracker
        title="Overall Client Status Progress"
        complete={overallComplete}
        total={allTasks.length}
        couple={couple}
        tone="status-overall"
      />
      <div className="workflow-tabs status-tabs">
        {statusMenu.map((x, i) => (
          <button
            key={x}
            className={section === x ? "active" : ""}
            onClick={() => setSection(x)}
          >
            <span>{i + 1}</span>
            {x}
          </button>
        ))}
      </div>
      <div className="single-tracker status-single">
        <div className="tracker-heading">
          <div>
            <small>CLIENT DELIVERY STATUS</small>
            <h2>{section}</h2>
            <p>
              Current {section.toLowerCase()} progress for {couple}.
            </p>
          </div>
          <strong>{percent}%</strong>
        </div>
        <Progress value={percent} />
        <span className="tracker-count">
          {complete} of {tasks.length} milestones completed
        </span>
        {tasks.map((task) => (
          <label key={task}>
            <Checkbox
              checked={!!done[task]}
              onCheckedChange={(v) => toggle(task, !!v)}
            />
            <span>{task}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
const financeData: Record<
  string,
  { summary: string; value: string; note: string; rows: string[][] }
> = {
  Quotes: {
    summary: "Quote Value",
    value: "₹8.97L",
    note: "6 active · 3 viewed",
    rows: [
      ["QT-1042", "Aakash & Anu", "Wedding Package", "₹2,25,000", "Accepted"],
      [
        "QT-1041",
        "Sanjay & Keerthi",
        "Wedding + Reception",
        "₹2,45,000",
        "Viewed",
      ],
      ["QT-1040", "Rahul & Priya", "Wedding Film", "₹1,60,000", "Sent"],
      ["QT-1039", "Karthik & Meera", "Wedding Package", "₹2,10,000", "Draft"],
    ],
  },
  Invoices: {
    summary: "Invoice Value",
    value: "₹7.82L",
    note: "8 invoices · 5 paid",
    rows: [
      ["INV-2409", "Aakash & Anu", "Advance Invoice", "₹75,000", "Paid"],
      ["INV-2398", "Naveen & Aarthi", "Album Balance", "₹42,000", "Due"],
      ["INV-2385", "Rohan & Sneha", "Final Invoice", "₹68,000", "Paid"],
      ["INV-2379", "Hari & Lakshmi", "Second Instalment", "₹85,000", "Overdue"],
    ],
  },
  "Advance Payment": {
    summary: "Advance Received",
    value: "₹3.42L",
    note: "38% of confirmed value",
    rows: [
      ["FS-2409", "Aakash & Anu", "03 Sep 2026", "₹75,000", "Bank Transfer"],
      ["FS-2398", "Naveen & Aarthi", "29 Aug 2026", "₹60,000", "UPI"],
      ["FS-2385", "Rohan & Sneha", "21 Aug 2026", "₹82,000", "Card"],
      [
        "FS-2379",
        "Hari & Lakshmi",
        "14 Aug 2026",
        "₹1,25,000",
        "Bank Transfer",
      ],
    ],
  },
  "Balance Payment": {
    summary: "Balance Collected",
    value: "₹4.40L",
    note: "Collected after advances",
    rows: [
      ["FS-2385", "Rohan & Sneha", "Final payment", "₹68,000", "Paid"],
      ["FS-2372", "Surya & Devi", "Delivery payment", "₹92,000", "Paid"],
      ["FS-2368", "Vishal & Deepa", "Album payment", "₹55,000", "Paid"],
      ["FS-2361", "Pranav & Riya", "Final settlement", "₹1,15,000", "Paid"],
    ],
  },
  "Outstanding Amount": {
    summary: "Total Outstanding",
    value: "₹4.18L",
    note: "5 clients · action required",
    rows: [
      ["FS-2398", "Naveen & Aarthi", "Due 06 Sep", "₹42,000", "Due"],
      ["FS-2379", "Hari & Lakshmi", "Overdue 4 days", "₹85,000", "Overdue"],
      ["FS-2402", "Gokul & Janani", "Due 12 Sep", "₹96,000", "Upcoming"],
      ["FS-2405", "Dinesh & Swetha", "Due 14 Sep", "₹1,10,000", "Upcoming"],
    ],
  },
  "Revenue Reports": {
    summary: "FY Revenue",
    value: "₹12.60L",
    note: "₹2.84L collected this month",
    rows: [
      [
        "September 2026",
        "8 Bookings",
        "₹3,25,000",
        "₹2,84,000",
        "87% Collected",
      ],
      ["August 2026", "12 Bookings", "₹4,82,000", "₹4,36,000", "90% Collected"],
      ["July 2026", "9 Bookings", "₹3,18,000", "₹2,91,000", "92% Collected"],
      ["June 2026", "7 Bookings", "₹2,42,000", "₹2,06,000", "85% Collected"],
    ],
  },
};
function Finance() {
  const [section, setSection] = useState("Dashboard");
  const [month, setMonth] = useState("May 2026");
  const financeNav = [
    "Dashboard",
    "Revenue Forecast",
    "Collections",
    "Profitability",
    "Invoices",
    "Expenses",
    "Reports",
  ];
  const mapped =
    section === "Collections"
      ? "Outstanding Amount"
      : section === "Reports"
        ? "Revenue Reports"
        : section === "Revenue Forecast"
          ? "Revenue Reports"
          : section === "Profitability"
            ? "Balance Payment"
            : section === "Expenses"
              ? "Advance Payment"
              : section;
  const d = financeData[mapped] || financeData.Quotes;
  const cashFlow = [
    { m: "Jun", booked: 12, collection: 5 },
    { m: "Jul", booked: 17, collection: 9 },
    { m: "Aug", booked: 18, collection: 11 },
    { m: "Sep", booked: 21, collection: 14 },
    { m: "Oct", booked: 27, collection: 17 },
    { m: "Nov", booked: 31, collection: 19 },
    { m: "Dec", booked: 34.5, collection: 28 },
    { m: "Jan", booked: 29, collection: 22 },
    { m: "Feb", booked: 24, collection: 18 },
    { m: "Mar", booked: 17, collection: 13 },
    { m: "Apr", booked: 15, collection: 9 },
    { m: "May", booked: 22, collection: 8.7 },
  ];
  const collection = [
    { name: "Wedding", value: 52, color: "#7138ef" },
    { name: "Reception", value: 18, color: "#4f83ec" },
    { name: "Pre Wedding", value: 12, color: "#f59e0b" },
    { name: "Maternity", value: 6, color: "#ef476f" },
    { name: "Baby Shoot", value: 5, color: "#18a66a" },
    { name: "Others", value: 7, color: "#a7afbd" },
  ];
  const downloadFinance = () => {
    const rows = [
      ["Module", "Reference", "Client", "Details", "Amount", "Status"],
      ...d.rows.map((r) => [section, ...r]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `focuz-${section.toLowerCase().replaceAll(" ", "-")}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("Report downloaded");
  };
  return (
    <section className="finance-page">
      <div className="finance-title">
        <div>
          <h2>Financial Dashboard</h2>
          <p>Complete financial overview of your photography business</p>
        </div>
        <div className="finance-actions">
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {["May 2026", "April 2026", "March 2026", "February 2026"].map(
              (x) => (
                <option key={x}>{x}</option>
              ),
            )}
          </select>
          <Button onClick={downloadFinance}>
            <Download /> Export Report
          </Button>
        </div>
      </div>
      <div className="module-nav">
        {financeNav.map((name) => (
          <button
            key={name}
            className={section === name ? "active" : ""}
            onClick={() => setSection(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {section === "Dashboard" ? (
        <>
          <div className="finance-kpis">
            {[
              ["Total Revenue (Booked)", "₹1,25,40,000", "↑ 18% vs Apr"],
              ["Amount Collected", "₹72,35,000", "57.7% of revenue"],
              ["Pending Collection", "₹53,05,000", "42.3% of revenue"],
              ["Expected Collection", "₹8,75,000", "From 12 projects"],
              ["Net Profit (This Month)", "₹5,42,000", "Profit margin 62%"],
            ].map(([a, b, c], i) => (
              <article key={a}>
                <IndianRupee />
                <span>
                  <small>{a}</small>
                  <b>{b}</b>
                  <em className={i === 2 ? "negative" : ""}>{c}</em>
                </span>
              </article>
            ))}
          </div>
          <div className="finance-dashboard-grid finance-reference-top">
            <article className="business-panel chart-panel forecast-panel">
              <header>
                <div>
                  <h3>Revenue Forecast — Next 12 Months</h3>
                  <p>
                    Expected revenue based on confirmed bookings and delivery
                    milestones
                  </p>
                </div>
                <button onClick={() => setSection("Revenue Forecast")}>
                  View Details
                </button>
              </header>
              <ResponsiveContainer width="100%" height={270}>
                <ComposedChart data={cashFlow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="booked" fill="#7138ef" radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="collection"
                    stroke="#18a66a"
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </article>
            <article className="business-panel collection-panel">
              <h3>Revenue by Service</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={collection}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={88}
                  >
                    {collection.map((x) => (
                      <Cell key={x.name} fill={x.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {collection.map((x) => (
                <p key={x.name}>
                  <i style={{ background: x.color }} />
                  <span>{x.name}</span>
                  <b>{x.value}%</b>
                </p>
              ))}
            </article>
            <article className="business-panel cash-panel cash-periods">
              <header>
                <h3>Cash Flow — Coming Months</h3>
                <button onClick={() => setSection("Collections")}>
                  View Details
                </button>
              </header>
              <div>
                {[
                  ["Next 30 Days", "₹21,50,000", "28 projects"],
                  ["Next 60 Days", "₹32,80,000", "41 projects"],
                  ["Next 90 Days", "₹46,25,000", "58 projects"],
                  ["Next 12 Months", "₹1.02 Cr", "126 projects"],
                ].map(([a, b, c]) => (
                  <button key={a} onClick={() => setSection("Collections")}>
                    <small>{a}</small>
                    <b>{b}</b>
                    <em>{c}</em>
                  </button>
                ))}
              </div>
            </article>
          </div>
          <div className="finance-dashboard-grid finance-reference-middle">
            <article className="business-panel stage-revenue">
              <h3>Revenue by Production Stage</h3>
              {[
                ["Shoot Completed", "12", "₹18,00,000", "Move to Editing"],
                ["Editing", "8", "₹12,00,000", "Complete Edit"],
                ["Album Design", "6", "₹9,00,000", "Share to Client"],
                ["Client Approval", "4", "₹6,00,000", "Get Approval"],
                ["Delivery Ready", "3", "₹5,00,000", "Collect Payment"],
              ].map((r) => (
                <div key={r[0]}>
                  <b>{r[0]}</b>
                  <span>{r[1]} projects</span>
                  <strong>{r[2]}</strong>
                  <button
                    onClick={() => toast.success(`${r[0]} action updated`)}
                  >
                    {r[3]}
                  </button>
                </div>
              ))}
            </article>
            <article className="business-panel opportunity-panel">
              <h3>Revenue Realization Opportunities</h3>
              <div className="opportunity-total">
                <small>Total Potential Collection</small>
                <strong>₹21,50,000</strong>
                <span>If pending work is completed</span>
              </div>
              {[
                ["Finish Editing", "₹4,50,000"],
                ["Complete Album Design", "₹8,00,000"],
                ["Share Album Approval", "₹6,00,000"],
                ["Deliver Wedding Films", "₹3,00,000"],
              ].map((x) => (
                <button
                  key={x[0]}
                  onClick={() => toast.success(`${x[0]} opened`)}
                >
                  <CheckCircle2 />
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                </button>
              ))}
            </article>
            <article className="business-panel profit-overview">
              <header>
                <h3>Profitability Overview</h3>
                <button onClick={() => setSection("Profitability")}>
                  This Month
                </button>
              </header>
              <div>
                <span>
                  <small>Total Income</small>
                  <b>₹8,75,000</b>
                </span>
                <span>
                  <small>Total Expenses</small>
                  <b>₹3,33,000</b>
                </span>
              </div>
              <section>
                <TrendingUp />
                <span>
                  <small>Net Profit</small>
                  <strong>₹5,42,000</strong>
                </span>
                <span>
                  <small>Profit Margin</small>
                  <strong>62%</strong>
                </span>
              </section>
            </article>
          </div>
          <div className="finance-dashboard-grid finance-reference-bottom">
            <article className="business-panel finance-list">
              <header>
                <h3>Top Profitable Projects</h3>
                <button onClick={() => setSection("Profitability")}>
                  View All
                </button>
              </header>
              {[
                ["Arjun & Priya Wedding", "₹2,05,000", "64%"],
                ["Karthik & Deepa Wedding", "₹1,70,000", "61%"],
                ["Ramesh & Divya Wedding", "₹1,30,000", "58%"],
                ["Vikram & Anu Wedding", "₹1,10,000", "56%"],
              ].map((x) => (
                <button
                  key={x[0]}
                  onClick={() => openPlatformLead(x[0].replace(" Wedding", ""))}
                >
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                  <em>{x[2]}</em>
                </button>
              ))}
            </article>
            <article className="business-panel finance-list">
              <header>
                <h3>Outstanding Payments</h3>
                <button onClick={() => setSection("Collections")}>
                  View All
                </button>
              </header>
              <div className="aging-cards">
                {[
                  ["0–30 Days", "₹5,20,000"],
                  ["31–60 Days", "₹3,15,000"],
                  ["61–90 Days", "₹2,10,000"],
                  ["90+ Days", "₹1,60,000"],
                ].map((x) => (
                  <span key={x[0]}>
                    <small>{x[0]}</small>
                    <b>{x[1]}</b>
                  </span>
                ))}
              </div>
              {financeData["Outstanding Amount"].rows.map((r) => (
                <button key={r[0]} onClick={() => openPlatformLead(r[1])}>
                  <span>{r[1]}</span>
                  <b>{r[3]}</b>
                  <em>{r[4]}</em>
                </button>
              ))}
            </article>
            <article className="business-panel insights-panel">
              <h3>Key Financial Insights</h3>
              {[
                "This month is profitable with 62% margin",
                "₹21.5L can be collected by completing pending work",
                "Album Design is the largest revenue bottleneck",
                "December is expected to be the highest month",
                "12 clients have payments pending beyond 30 days",
              ].map((x) => (
                <button key={x} onClick={() => toast.info(x)}>
                  <TrendingUp />
                  <span>{x}</span>
                </button>
              ))}
            </article>
          </div>
        </>
      ) : (
        <>
          <div className="finance-focus">
            <div>
              <small>{section.toUpperCase()}</small>
              <h2>{d.summary}</h2>
              <strong>{d.value}</strong>
              <p>{d.note}</p>
            </div>
            <Button
              onClick={() =>
                section === "Reports"
                  ? downloadFinance()
                  : toast.success(`${section} record added`)
              }
            >
              {section === "Reports"
                ? "Download Report"
                : section === "Quotes"
                  ? "Create Quote"
                  : section === "Invoices"
                    ? "Create Invoice"
                    : "Record Payment"}
            </Button>
          </div>
          <div className="table finance-table">
            <div className="table-title">
              <div>
                <h2>{section}</h2>
                <p>Latest records and payment status</p>
              </div>
              <button>
                All records <ChevronDown />
              </button>
            </div>
            <div className="table-head">
              <span>REFERENCE</span>
              <span>CLIENT / PERIOD</span>
              <span>DETAILS</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
            </div>
            {d.rows.map((r, index) => (
              <div
                className="finance-row clickable-lead"
                key={r[0] + index}
                onClick={() => openPlatformLead(r[1])}
              >
                {r.map((x, i) => (
                  <span
                    key={x}
                    className={
                      i === 4
                        ? `status-pill ${x.toLowerCase().replaceAll(" ", "-")}`
                        : ""
                    }
                  >
                    {x}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
function Status() {
  return (
    <>
      <Project />
      <div className="status">
        {[
          ["Album", "AL-2 Review", 74],
          ["Traditional Video", "Link Shared", 82],
          ["Wedding Film", "RV-1", 65],
        ].map(([a, b, c]: any) => (
          <article key={a}>
            <div>
              <Film />
              <span>
                <b>{a}</b>
                <small>{b}</small>
              </span>
              <strong>{c}%</strong>
            </div>
            <Progress value={c} />
            <p>Client will be notified when the next version is ready.</p>
          </article>
        ))}
      </div>
    </>
  );
}
