import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PlantList from './components/PlantList';
import PlantApiData from './components/PlantApiData';
import { nativePlants } from './plantsData';

export default function App() {
  return (
    <div>
      <Header />
      <Navigation />
      
      <PlantApiData />
      <PlantList plants={nativePlants} />
    </div>
  );
}
