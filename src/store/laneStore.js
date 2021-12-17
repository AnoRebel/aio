import { defineStore, acceptHMRUpdate } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useLaneStore = defineStore("lanes", {
  state: () => ({
    lanes: [
      {
        name: "To Do",
        tickets: [
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 56,
          },
          {
            title:
              "Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!",
            author: "Hermes Conrad",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 10,
          },
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 3,
          },
        ],
      },
      {
        name: "In Progress",
        tickets: [
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 2,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 12,
          },
        ],
      },
      {
        name: "Done",
        tickets: [
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
        ],
      },
    ],
    altLanes: [
      {
        id: 1,
        name: "To Do",
        type: "lane",
        tickets: [
          {
            id: 1,
            type: "ticket",
            loading: false,
            data: {
              title:
                "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
              author: "Philip J. Fry",
              created_at: "16 hours ago",
              level: "Medium Level",
              comments_count: 12,
            },
          },
          {
            id: 2,
            type: "ticket",
            loading: false,
            data: {
              title:
                "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
              author: "Turanga Leela",
              created_at: "16 hours ago",
              level: "High Level",
              comments_count: 1,
            },
          },
          {
            id: 3,
            type: "ticket",
            loading: false,
            data: {
              title:
                "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
              author: "Bender Bending Rodriguez",
              created_at: "16 hours ago",
              level: "Low Level",
              comments_count: 12,
            },
          },
          {
            id: 4,
            type: "ticket",
            loading: false,
            data: {
              title:
                "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
              author: "Professor Farnsworth",
              created_at: "16 hours ago",
              level: "Medium Level",
              comments_count: 0,
            },
          },
          {
            id: 5,
            type: "ticket",
            loading: false,
            data: {
              title:
                "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
              author: "Amy Wong",
              created_at: "16 hours ago",
              level: "High Level",
              comments_count: 56,
            },
          },
          {
            id: 6,
            type: "ticket",
            loading: false,
            data: {
              title:
                "Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!",
              author: "Hermes Conrad",
              created_at: "16 hours ago",
              level: "Medium Level",
              comments_count: 10,
            },
          },
          {
            id: 7,
            type: "ticket",
            loading: false,
            data: {
              title:
                "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
              author: "Dr. John A. Zoidberg",
              created_at: "16 hours ago",
              level: "Low Level",
              comments_count: 3,
            },
          },
        ],
      },
      {
        id: 2,
        name: "In Progress",
        type: "lane",
        tickets: [
          {
            id: 1,
            type: "ticket",
            loading: false,
            data: {
              title:
                "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
              author: "Dr. John A. Zoidberg",
              created_at: "16 hours ago",
              level: "Low Level",
              comments_count: 12,
            },
          },
          {
            id: 2,
            type: "ticket",
            loading: false,
            data: {
              title:
                "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
              author: "Amy Wong",
              created_at: "16 hours ago",
              level: "High Level",
              comments_count: 2,
            },
          },
          {
            id: 3,
            type: "ticket",
            loading: false,
            data: {
              title:
                "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
              author: "Turanga Leela",
              created_at: "16 hours ago",
              level: "High Level",
              comments_count: 12,
            },
          },
        ],
      },
      {
        id: 3,
        name: "Done",
        type: "lane",
        tickets: [
          {
            id: 1,
            type: "ticket",
            loading: false,
            data: {
              title:
                "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
              author: "Bender Bending Rodriguez",
              created_at: "16 hours ago",
              level: "Low Level",
              comments_count: 12,
            },
          },
          {
            id: 2,
            type: "ticket",
            loading: false,
            data: {
              title:
                "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
              author: "Professor Farnsworth",
              created_at: "16 hours ago",
              level: "Medium Level",
              comments_count: 0,
            },
          },
          {
            id: 3,
            type: "ticket",
            loading: false,
            data: {
              title:
                "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
              author: "Philip J. Fry",
              created_at: "16 hours ago",
              level: "Medium Level",
              comments_count: 12,
            },
          },
          {
            id: 4,
            type: "ticket",
            loading: false,
            data: {
              title:
                "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
              author: "Turanga Leela",
              created_at: "16 hours ago",
              level: "High Level",
              comments_count: 1,
            },
          },
        ],
      },
    ],
  }),
  actions: {
    addLane(data) {
      console.log(data);
      let newLane = {
        name: data.name,
        tickets: data.tickets ?? [],
      };
      this.lanes.push(newLane);
    },
    addAltLane(data) {
      console.log(data);
      let newLane = {
        id: this.altLanes.length + 1,
        name: data.name,
        type: "lane",
        props: {
          orientation: "horizontal",
        },
        tickets: data.tickets ?? [],
      };
      this.altLanes.push(newLane);
    },
    updateLanes(data) {
      console.log(data);
      this.lanes = data;
    },
    updateAltLanes(data) {
      console.log(data);
      this.altLanes = data;
    },
    addTicket({ lane, ticket }) {
      console.log(lane, ticket);
      let tickets = this.lanes.find(l => l.name == lane).tickets;
      let newTicket = {
        title: ticket.title || "AnoRebel",
        author: ticket.author || "Ano Rebel",
        created_at: Date.now(),
        level: ticket.level || "Low Level",
        comments_count: ticket.comments_count || 0,
      };
      tickets.push(newTicket);
    },
    addAltTicket({ lane, ticket }) {
      console.log(lane, ticket);
      let tickets = this.altLanes.find(l => l.name == lane).tickets;
      let newTicket = {
        id: tickets.length + 1,
        type: "ticket",
        loading: false,
        props: {
          orientation: "vertical",
        },
        data: {
          title: ticket.title || "AnoRebel",
          author: ticket.author || "Ano Rebel",
          created_at: Date.now(),
          level: ticket.level || "Low Level",
          comments_count: ticket.comments_count || 0,
        },
      };
      tickets.push(newTicket);
    },
  },
  getters: {
    getLanes: state => state.lanes,
    getAltLanes: state => state.altLanes,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaneStore, import.meta.hot));
}

export default useLaneStore;
