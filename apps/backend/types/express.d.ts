declare global {
  namespace Express { // reach into the global type scope
    interface Request { // find Express's namespace
      user: {           // find its Request interface...
        userId: number; // ...and ADD this property to it
      };
    }
  }
}

export {};