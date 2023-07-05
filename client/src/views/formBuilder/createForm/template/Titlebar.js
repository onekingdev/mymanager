import React from 'react'
import { Input } from 'reactstrap'

export default function Titlebar({collapse,handleCollapse}) {
  return (
    <div className="workspace-title">
    {collapse ? (
      <Button className="btn-icon" size="sm" color="flat-dark" onClick={handleCollapse}>
        <ChevronRight size={14} style={{ margin: '-2px -2px' }} />
      </Button>
    ) : null}
     <div className="app-workspace-wrapper">
     
    </div>
    
  </div>
  )
}
