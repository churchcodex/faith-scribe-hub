import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockChurches } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, AlertCircle } from 'lucide-react';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Mock coordinates for demonstration (in a real app, you'd geocode the addresses)
    const churchLocations = [
      { name: 'Grace Community Church', location: 'Los Angeles, CA', coordinates: [-118.2437, 34.0522] },
      { name: 'Hillsong Church', location: 'New York, NY', coordinates: [-74.0060, 40.7128] },
      { name: 'Lakewood Church', location: 'Houston, TX', coordinates: [-95.3698, 29.7604] },
      { name: 'Saddleback Church', location: 'Lake Forest, CA', coordinates: [-117.6897, 33.6303] },
    ];

    // Add markers for each church
    churchLocations.forEach((church, index) => {
      const churchData = mockChurches[index];
      if (!churchData) return;

      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div style="
          background: hsl(205 90% 35%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          cursor: pointer;
        ">
          ${index + 1}
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${church.name}</h3>
          <p style="margin: 0 0 4px 0; color: #666;">${church.location}</p>
          <p style="margin: 0 0 4px 0;"><strong>Members:</strong> ${churchData.members.toLocaleString()}</p>
          <p style="margin: 0;"><strong>Income:</strong> $${(churchData.income / 1000000).toFixed(1)}M</p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat(church.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Map View</h1>
          <p className="text-muted-foreground mt-2">
            View church locations on an interactive map
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Mapbox Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-info/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-info mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm">
                  To display the interactive map, please enter your Mapbox public token.
                </p>
                <p className="text-xs text-muted-foreground">
                  You can get your token from{' '}
                  <a 
                    href="https://mapbox.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>{' '}
                  after creating a free account.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label htmlFor="mapbox-token" className="block text-sm font-medium mb-2">
                  Mapbox Public Token
                </label>
                <Input
                  id="mapbox-token"
                  type="text"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Initialize Map
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Map View</h1>
        <p className="text-muted-foreground mt-2">
          Interactive map showing church locations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div 
                ref={mapContainer} 
                className="w-full h-[600px] rounded-lg"
                style={{ minHeight: '600px' }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Church Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockChurches.map((church, index) => (
                <div key={church.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{church.name}</p>
                    <p className="text-xs text-muted-foreground">{church.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {church.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;