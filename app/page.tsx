"use client";
import { useState } from "react";
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
  Film,
  IndianRupee,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
type Card = {
  id: string;
  title: string;
  sub: string;
  date: string;
  value?: string;
  tag?: string;
  progress?: number;
};
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
const postMenu = [
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
const eventOptions = ["Wedding", "Reception", "Engagement", "Pre-Wedding", "Maternity", "Baby Shower", "Birthday", "Corporate Event"];
const serviceOptions = ["Photography Only", "Videography Only", "Photography + Videography", "Traditional Photography", "Candid Photography", "Wedding Film", "Complete Wedding Package"];
const addOnOptions = ["Drone Coverage", "LED Wall", "Live Streaming", "Pre-Wedding Shoot", "Same-Day Edit", "Extra Photographer", "Extra Videographer"];
const deliverableOptions = ["Online Gallery", "Highlight Pictures", "Photo Album", "Traditional Video", "Wedding Film", "Teaser Reel", "Client Hard Disk Copy"];
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
    [activePost, setActivePost] = useState("File Management"),
    [boards, setBoards] = useState(initial),
    [mobile, setMobile] = useState(false),
    [query, setQuery] = useState(""),
    [lead, setLead] = useState({ name: "", phone: "", email: "", event: "Wedding", service: "Complete Wedding Package", eventDate: "", venue: "", city: "", source: "Instagram", owner: "Focuz Studios", value: "", followUp: "", notes: "", addons: [] as string[], deliverables: [] as string[] });
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
    setLead({ name: "", phone: "", email: "", event: "Wedding", service: "Complete Wedding Package", eventDate: "", venue: "", city: "", source: "Instagram", owner: "Focuz Studios", value: "", followUp: "", notes: "", addons: [], deliverables: [] });
    toast.success("Lead added");
  };
  const openPost = (name: string) => {
    setActivePost(name);
    setActive("Post Production");
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
                  setActive(m);
                  setMobile(false);
                }}
              >
                <I />
                <span>{m}</span>
                {m === "Leads" && <em>6</em>}
                {m === "Post Production" && (
                  <ChevronDown className="nav-chevron" />
                )}
              </button>
              {m === "Post Production" && active === "Post Production" && (
                <div className="post-submenu">
                  {postMenu.map((item, i) => (
                    <button
                      className={activePost === item ? "selected" : ""}
                      key={item}
                      onClick={() => openPost(item)}
                    >
                      <span>{i + 1}</span>
                      {item}
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
            <h1>{active === "Post Production" ? activePost : active}</h1>
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
                    <div className="form-section full"><b>Client Information</b><span>Couple and contact details</span></div>
                    <label><span>Couple Name *</span><Input placeholder="Arun & Kavya" value={lead.name} onChange={(e)=>setLead({...lead,name:e.target.value})}/></label>
                    <label><span>WhatsApp Number *</span><Input placeholder="+91 98765 43210" value={lead.phone} onChange={(e)=>setLead({...lead,phone:e.target.value})}/></label>
                    <label><span>Email Address</span><Input type="email" placeholder="couple@email.com" value={lead.email} onChange={(e)=>setLead({...lead,email:e.target.value})}/></label>
                    <label><span>Lead Source</span><select value={lead.source} onChange={(e)=>setLead({...lead,source:e.target.value})}><option>Instagram</option><option>Website</option><option>Referral</option><option>WhatsApp</option><option>Google</option><option>Walk-in</option><option>Other</option></select></label>
                    <div className="form-section full"><b>Event Information</b><span>Event type, date and location</span></div>
                    <label><span>Event Type *</span><select value={lead.event} onChange={(e)=>setLead({...lead,event:e.target.value})}>{eventOptions.map(x=><option key={x}>{x}</option>)}</select></label>
                    <label><span>Event Date</span><Input type="date" value={lead.eventDate} onChange={(e)=>setLead({...lead,eventDate:e.target.value})}/></label>
                    <label><span>Venue</span><Input placeholder="Venue name" value={lead.venue} onChange={(e)=>setLead({...lead,venue:e.target.value})}/></label>
                    <label><span>City</span><Input placeholder="Chennai" value={lead.city} onChange={(e)=>setLead({...lead,city:e.target.value})}/></label>
                    <div className="form-section full"><b>Quote Template</b><span>Service, add-ons and deliverables</span></div>
                    <label className="full"><span>Primary Service *</span><select value={lead.service} onChange={(e)=>setLead({...lead,service:e.target.value})}>{serviceOptions.map(x=><option key={x}>{x}</option>)}</select></label>
                    <fieldset className="choice-box full"><legend>Add-ons</legend><div>{addOnOptions.map(x=><label key={x}><Checkbox checked={lead.addons.includes(x)} onCheckedChange={(v)=>setLead({...lead,addons:v?[...lead.addons,x]:lead.addons.filter(a=>a!==x)})}/><span>{x}</span></label>)}</div></fieldset>
                    <fieldset className="choice-box full"><legend>Deliverables</legend><div>{deliverableOptions.map(x=><label key={x}><Checkbox checked={lead.deliverables.includes(x)} onCheckedChange={(v)=>setLead({...lead,deliverables:v?[...lead.deliverables,x]:lead.deliverables.filter(a=>a!==x)})}/><span>{x}</span></label>)}</div></fieldset>
                    <label><span>Estimated Quote (₹)</span><Input inputMode="numeric" placeholder="185000" value={lead.value} onChange={(e)=>setLead({...lead,value:e.target.value})}/></label>
                    <label><span>Follow-up Date</span><Input type="date" value={lead.followUp} onChange={(e)=>setLead({...lead,followUp:e.target.value})}/></label>
                    <label><span>Lead Owner</span><select value={lead.owner} onChange={(e)=>setLead({...lead,owner:e.target.value})}><option>Focuz Studios</option><option>Chandhru</option><option>Sales Team</option><option>Studio Manager</option></select></label>
                    <label className="full"><span>Special Notes</span><textarea placeholder="Requirements, preferred style, package discussion…" value={lead.notes} onChange={(e)=>setLead({...lead,notes:e.target.value})}/></label>
                    <div className="lead-form-actions full"><Button variant="outline">Save as Draft</Button><Button onClick={add}>Create Lead</Button></div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </section>
        </header>
        {active === "Leads" && (
          <>
            <div className="stats">
              <Stat
                a="Total Leads"
                b={`${leads.length}`}
                c="Across all stages"
              />
              <Stat
                a="Pipeline Value"
                b={`₹${(total / 100000).toFixed(2)}L`}
                c="Current quoted value"
              />
              <Stat
                a="Won Leads"
                b={`${boards.Leads.Won.length}`}
                c="Calendar auto-blocked"
              />
              <Stat
                a="Follow-ups Due"
                b={`${boards.Leads["Follow-ups"].length}`}
                c="Action required"
                red
              />
            </div>
            <Board
              title="Lead Pipeline"
              board="Leads"
              data={boards.Leads}
              query={query}
              move={move}
            />
          </>
        )}
        {active === "Upcoming Shoots" && (
          <>
            <Banner
              title="Planning board"
              text="Move confirmed clients from Yet to Plan through Draft to Fully Planned."
            />
            <Board
              title="Upcoming Shoots"
              board="Upcoming Shoots"
              data={boards["Upcoming Shoots"]}
              query={query}
              move={move}
            />
          </>
        )}
        {active === "Post Production" && (
          <PostProduction query={query} selected={activePost} />
        )}
        {active === "Production - Shoot" && (
          <>
            <Project />
            <Groups groups={production} />
          </>
        )}
        {active === "Deliveries" && <Deliveries />}{" "}
        {active === "Finance" && <Finance />}
        {active === "Social Media" && <SocialMedia />}{" "}
        {active === "Client Status Check" && <ClientStatusTracker />}
      </main>
    </div>
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
function priceTotal(cards: Card[]) {
  return cards.reduce(
    (sum, c) => sum + Number((c.value || "").replace(/\D/g, "")),
    0,
  );
}
function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
function Board({ title, board, data, query, move }: any) {
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
function Project() {
  return (
    <div className="banner">
      <div>
        <small>ACTIVE SHOOT</small>
        <h2>Aakash & Anu — Wedding</h2>
        <p>21 September · Madurai · Project FS-2409</p>
      </div>
      <Button variant="outline">Change Project</Button>
    </div>
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
  return (
    <section className="delivery-page">
      <div className="delivery-lead">
        <div className="lead-identity">
          <span className="lead-avatar">
            {lead.couple
              .split(" ")
              .filter((x) => x !== "&")
              .map((x) => x[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <small>DELIVERY PROJECT · {lead.id}</small>
            <h2>{lead.couple}</h2>
            <p>
              {lead.event} · {lead.date} · {lead.venue}
            </p>
            <b>{lead.package}</b>
          </div>
        </div>
        <div className="lead-switch">
          <label>Track another lead</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {deliveryLeads.map((x) => (
              <option key={x.id} value={x.id}>
                {x.couple} · {x.id}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overall-progress">
        <div>
          <span>Overall Delivery Progress</span>
          <strong>{overall}%</strong>
        </div>
        <Progress value={overall} />
        <small>
          {completed} of {allKeys.length} delivery actions completed for{" "}
          {lead.couple}
        </small>
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
              <small>
                {complete} of {items.length} completed
              </small>
              {items.map((item) => {
                const key = `${name}:${item}`;
                return (
                  <label key={key}>
                    <Checkbox
                      checked={!!checked[key]}
                      onCheckedChange={(v) => toggle(key, !!v)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </article>
          );
        })}
      </div>
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
      <div className="lead-identity">
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
      </div>
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
  const [section, setSection] = useState(socialMenu[0]);
  const [tracking, setTracking] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const key = `${selectedLead}:${section}`,
    done = tracking[key] || {},
    tasks = socialTasks[section],
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
      <OverallTracker
        title="Overall Social Media Progress"
        complete={overallComplete}
        total={allTasks.length}
        couple={couple}
        tone="social-overall"
      />
      <div className="workflow-tabs">
        {socialMenu.map((x, i) => (
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
      </div>
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
  const [section, setSection] = useState("Quotes");
  const d = financeData[section];
  return (
    <section className="finance-page">
      <div className="stats">
        <Stat a="Total Quotes" b="₹8.97L" c="6 active quotes" />
        <Stat a="Advance Received" b="₹3.42L" c="38% collected" />
        <Stat a="Outstanding" b="₹4.18L" c="5 payments due" red />
        <Stat a="FY Revenue" b="₹12.60L" c="Collected revenue" />
      </div>
      <div className="finance-tabs">
        {Object.keys(financeData).map((name, i) => (
          <button
            key={name}
            data-index={i}
            className={section === name ? "active" : ""}
            onClick={() => setSection(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="finance-focus">
        <div>
          <small>{section.toUpperCase()}</small>
          <h2>{d.summary}</h2>
          <strong>{d.value}</strong>
          <p>{d.note}</p>
        </div>
        <Button
          onClick={() =>
            toast.success(
              section === "Revenue Reports"
                ? "Revenue report prepared"
                : "Finance record action opened",
            )
          }
        >
          {section === "Revenue Reports"
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
          <div className="finance-row" key={r[0] + index}>
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
