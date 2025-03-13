import React, { useState, useEffect } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { defaultPreferences } from '../../../storage-keys';
import { getStorage, setStorage } from "../../utilities/chromeStorage";
import { styled } from "@stitches/react";

const StyledSegmentedControlList = styled(TabsPrimitive.List, {
  display: 'flex',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#e1e8ed',
});

const StyledSegmentedControlTrigger = styled(TabsPrimitive.Trigger, {
  flex: 1,
  padding: '4px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  backgroundColor: '#e1e8ed',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: '#536471',
  
  '&[data-state="active"]': {
    backgroundColor: '#fff',
    color: '#1da1f2',
    fontWeight: 'bold',
  }
});

const StyledSegmentedControlRoot = styled(TabsPrimitive.Root, {
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const SegmentedControlList = ({ segments }) => (
  <StyledSegmentedControlList>
    {segments.map((segment) => (
      <SegmentedControlTrigger key={segment.value} value={segment.value} label={segment.label} />
    ))}
  </StyledSegmentedControlList>
);

export const SegmentedControlTrigger = ({ value, label }) => (
  <StyledSegmentedControlTrigger value={value}>
    {label}
  </StyledSegmentedControlTrigger>
);

export const SegmentedControl = ({ segments = [], storageKey }) => {
  const [value, setValue] = useState(null);
  
  useEffect(() => {
    getStorage(storageKey).then((storedValue) => {
      if (storedValue !== undefined) {
        setValue(storedValue);
      } else {
        setValue(defaultPreferences[storageKey] || (segments[0]?.value || null));
      }
    });
  }, [storageKey, segments]);
  
  const handleValueChange = async(newValue) => {
    setValue(newValue);
    
    await setStorage({ [storageKey]: newValue });
  };
  
  if (segments.length === 0) {
    return null;
  }
  
  return (
    <StyledSegmentedControlRoot 
      value={value || segments[0].value} 
      onValueChange={handleValueChange}
      defaultValue={segments[0].value}
    >
      <SegmentedControlList segments={segments} />
    </StyledSegmentedControlRoot>
  );
};
