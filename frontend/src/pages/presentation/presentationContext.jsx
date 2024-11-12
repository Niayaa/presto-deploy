import React, { createContext, useContext, useState, useEffect } from 'react';

const PresentationContext = createContext();

export const usePresentations = () => useContext(PresentationContext);

export const PresentationProvider = ({ children }) => {
  const [presentations, setPresentations] = useState(() => {
    const savedPresentations = localStorage.getItem('presentations');
    return savedPresentations ? JSON.parse(savedPresentations) : [];
  });

  useEffect(() => {
    localStorage.setItem('presentations', JSON.stringify(presentations));
  }, [presentations]);

  const addPresentation = (newPresentation) => {
    setPresentations((prev) => [...prev, newPresentation]);
  };

  const deletePresentation = (id) => {
    setPresentations((prev) => prev.filter((p) => p.id !== parseInt(id)));
  };

  const updatePresentationTitle = (id, newTitle) => {
    setPresentations((prev) =>
      prev.map((p) => (p.id === parseInt(id) ? { ...p, name: newTitle } : p))
    );
  };

  const getPresentationById = (id) => presentations.find((p) => p.id === parseInt(id));

  return (
    <PresentationContext.Provider value={{
      presentations,
      addPresentation,
      getPresentationById,
      deletePresentation,
      updatePresentationTitle,
    }}>
      {children}
    </PresentationContext.Provider>
  );
};
