import React, { useMemo, useRef, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './creator.css';
import { toPng } from 'html-to-image';





export default function ComicCreatorPage() {
  const [layout, setLayout] = useState('2x2');
  const [panels, setPanels] = useState(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('comic_panels_v1');
    return saved ? JSON.parse(saved) : [
      { id: 'p1', bg: '', fit: 'cover', bubbles: [] },
      { id: 'p2', bg: '', fit: 'cover', bubbles: [] },
      { id: 'p3', bg: '', fit: 'cover', bubbles: [] },
      { id: 'p4', bg: '', fit: 'cover', bubbles: [] },
    ];
  });
  const [activePanel, setActivePanel] = useState('p1');
  const [showPreview, setShowPreview] = useState(false);

  const boardRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('comic_panels_v1', JSON.stringify(panels));
  }, [panels]);

  const gridTemplate = useMemo(() => {
    switch (layout) {
      /*case '1x3':
        return { cols: 1, rows: 3, template: '1fr / 1fr' };*/
      case '3x1':
        return { cols: 3, rows: 1, template: '1fr 1fr 1fr / 1fr' };
      case '1x1':
        return { cols: 1, rows: 1, template: '1fr / 1fr' };
      default: // '2x2'
        return { cols: 2, rows: 2, template: '1fr 1fr / 1fr 1fr' };
    }
  }, [layout]);

  const visiblePanels = useMemo(() => {
    const needed = gridTemplate.cols * gridTemplate.rows;
    return panels.slice(0, needed);
  }, [panels, gridTemplate]);

  function handleImageUpload(panelId, file) {
    if (!file) return;
    const reader=new FileReader();
    reader.onload=()=>{
      const base64Image=reader.result;
    
    setPanels(prev => prev.map(p => p.id === panelId ? { ...p, bg: base64Image } : p));
    };
    reader.readAsDataURL(file);
  }

  function addBubble(panelId, type = 'speech') {
    setPanels(prev => prev.map(p => {
      if (p.id !== panelId) return p;
      const id = `${panelId}-b${(p.bubbles?.length || 0) + 1}`;
      const bubble = {
        id,
        type, // 'speech' | 'thought' | 'narration'
        x: 20, y: 20, w: 180, h: 90,
        text: type === 'narration' ? 'Narration...' : 'Say something...',
      };
      return { ...p, bubbles: [...(p.bubbles || []), bubble] };
    }));
  }

  function removeBubble(panelId, bubbleId) {
    setPanels(prev => prev.map(p => p.id === panelId ? { ...p, bubbles: p.bubbles.filter(b => b.id !== bubbleId) } : p));
  }

  function updateBubble(panelId, bubbleId, changes) {
    setPanels(prev => prev.map(p => {
      if (p.id !== panelId) return p;
      return {
        ...p,
        bubbles: p.bubbles.map(b => b.id === bubbleId ? { ...b, ...changes } : b)
      };
    }));
  }

  // Drag state
  const dragState = useRef({ dragging: null, offsetX: 0, offsetY: 0 });

  function onBubbleMouseDown(e, panelId, bubble) {
    e.preventDefault();
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragState.current = {
      dragging: { panelId, bubbleId: bubble.id },
      offsetX: e.clientX - rect.left - bubble.x,
      offsetY: e.clientY - rect.top - bubble.y,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    const ds = dragState.current;
    if (!ds.dragging) return;
    const { panelId, bubbleId } = ds.dragging;
    const panelEl = document.getElementById(panelId);
    if (!panelEl) return;
    const rect = panelEl.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - ds.offsetX, rect.width - 20));
    const y = Math.max(0, Math.min(e.clientY - rect.top - ds.offsetY, rect.height - 20));
    updateBubble(panelId, bubbleId, { x, y });
  }

  function onMouseUp() {
    dragState.current = { dragging: null, offsetX: 0, offsetY: 0 };
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function clearPanel(panelId) {
    setPanels(prev => prev.map(p => p.id === panelId ? { ...p, bg: '', bubbles: [] } : p));
  }

  async function exportPNG() {
    if (!boardRef.current) return;
    
     try {
       const dataUrl = await toPng(boardRef.current, { cacheBust: true ,useCORS:true});
       const link = document.createElement('a');
       link.download = 'comic.png';
       link.href = dataUrl;
      link.click();
      } catch (e) {
      console.error(e);
     }
    //alert('To enable export, install html-to-image and uncomment code in exportPNG().');
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      
      <style>{`
        .board {
          border: 2px solid #222; border-radius: 10px; background:#fff;
          overflow: hidden;
        }
        .panel {
          position: relative; border: 2px solid rgba(252, 248, 248, 1); background:#E4004B;
        }
        .panel .bg-img {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit: cover;
        }
        .panel.fit-contain .bg-img { object-fit: contain; background:rgba(252, 248, 248, 1); }
        .bubble {
          position:absolute; background:#fff; border:2px solid #222; border-radius: 16px;
          padding: 8px 12px; cursor: move; box-shadow: 0 4px 8px rgba(0,0,0,.15);
        }
        .bubble.thought { border-radius: 999px; }
        .bubble.narration { border-radius: 6px; background: #fff7d6; }
        .bubble textarea {
          width:100%; height:100%; resize:none; background:transparent; border:none; outline:none;
          font-weight:600; font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        .tool-btn { min-width: 42px; }
        .grid {
          display:grid; gap:10px;
        }
      `}</style>

      {/* TOP BAR */}
      <header className="bg-light text-dark">
        <div className="container py-3 d-flex align-items-center gap-2">
         
          <h5 className="m-0" style={{justifyContent:"center",fontSize:'30px'}}>Create Your Own Comic</h5>
         
        </div>
      </header>

      {/* CONTROLS */}
      <div className="container mt-3">
        <div className="row g-3">
          <div className="col-12 col-lg-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-uppercase text-light">Layout</h6>
                <div className="btn-group w-100 mb-3">
                  <button className={`btn btn-outline-secondary ${layout==='2x2'?'active':''}`} onClick={() => setLayout('2x2')}>2x2</button>
                  {/*<button className={`btn btn-outline-secondary ${layout==='1x3'?'active':''}`} onClick={() => setLayout('1x3')}>1x3</button>*/}
                  <button className={`btn btn-outline-secondary ${layout==='3x1'?'active':''}`} onClick={() => setLayout('3x1')}>3x1</button>
                  <button className={`btn btn-outline-secondary ${layout==='1x1'?'active':''}`} onClick={() => setLayout('1x1')}>1x1</button>
                </div>

                <h6 className="text-uppercase text-light">Panel Tools</h6>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <button className="btn btn-primary btn-sm" onClick={() => addBubble(activePanel, 'speech')}>+ Speech</button>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => addBubble(activePanel, 'thought')}>+ Thought</button>
                  <button className="btn btn-warning btn-sm" onClick={() => addBubble(activePanel, 'narration')}>+ Narration</button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <label className="btn btn-outline-secondary btn-sm mb-0">
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(activePanel, e.target.files?.[0])} />
                  </label>
                  <select className="form-select form-select-sm w-auto" value={(panels.find(p=>p.id===activePanel)?.fit)||'cover'} onChange={(e)=>setPanels(prev=>prev.map(p=>p.id===activePanel?{...p, fit:e.target.value}:p))}>
                    <option value="cover">Fit: Cover</option>
                    <option value="contain">Fit: Contain</option>
                  </select>
                  <button className="btn btn-outline-danger btn-sm" onClick={()=>clearPanel(activePanel)}>Clear Panel</button>
                </div>
                <div className="mt-3 small text-muted">Active panel: <code>{activePanel}</code></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            <div className="board p-2" ref={boardRef}>
              <div
                className="grid"
                style={{ gridTemplate: gridTemplate.template }}
              >
                {visiblePanels.map((panel, idx) => (
                  <div
                    key={panel.id}
                    id={panel.id}
                    className={`panel ${panel.fit==='contain' ? 'fit-contain' : ''} ${activePanel===panel.id?'ring':''}`}
                    style={{ aspectRatio: layout==='3x1' ? '3 / 1' : layout==='1x3' ? '1 / 3' : '1 / 1' }}
                    onClick={() => setActivePanel(panel.id)}
                  >
                    {panel.bg && (
                      <img className="bg-img" src={panel.bg} alt="panel background" />
                    )}
                
               

                    {(panel.bubbles || []).map(b => (
                      <div
                        key={b.id}
                        className={`bubble ${b.type}`}
                        style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
                         onMouseDown={(e) => {
                         
                         if (e.target.getAttribute("contenteditable") !== "true") {
                                onBubbleMouseDown(e, panel.id, b);
                         }
                     }}
                      >
                        <div
                           contentEditable
                           suppressContentEditableWarning={true}
                            style={{
                             padding: "2px",
                             textAlign: "center",
                             outline: "none",
                             width: "100%",
                             height: "60%", 
                             cursor: "text",
                            fontSize: "14px"
                            }}
                          onBlur={(e) => updateBubble(panel.id, b.id, { text: e.target.innerText })}
                          onClick={(e)=> e.stopPropagation()}
                          
                          >
                          {b.text}
                        </div>
   
                        <div className="d-flex justify-content-between mt-1" style={{pointerEvents:'none'}}>
                          <small className="text-muted" style={{pointerEvents:'auto'}}></small>
                          <button
                            className="btn btn-sm btn-link text-danger p-0"
                            style={{pointerEvents:'auto'}}
                            onClick={(e)=>{ e.stopPropagation(); removeBubble(panel.id, b.id); }}
                            title="Remove"
                          >✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex gap-2 mt-2">
              {/*<button className="btn btn-outline-secondary btn-sm" onClick={exportPNG}>Export</button>*/}
              <button className="btn btn-success btn-sm" onClick={()=>setShowPreview(true)}>Preview</button>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW OVERLAY */}
      {showPreview && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center" style={{zIndex:1050}}>
          <div className="container">
            <div className="bg-white p-3 rounded-3 shadow">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Preview</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={()=>setShowPreview(false)}>Close</button>
                  <button className="btn btn-warning btn-sm" onClick={exportPNG}>Export PNG</button>
                </div>
              </div>
              {/* Clone of board for preview (read-only) */}
              <div className="board p-2">
                <div className="grid" style={{ gridTemplate: gridTemplate.template }}>
                  {visiblePanels.map(panel => (
                    <div key={panel.id} className={`panel ${panel.fit==='contain' ? 'fit-contain' : ''}`} style={{ aspectRatio: layout==='3x1' ? '3 / 1' : layout==='1x3' ? '1 / 3' : '1 / 1' }}>
                      {panel.bg && <img className="bg-img" src={panel.bg} alt="panel" />}
                      {(panel.bubbles||[]).map(b => (
                        <div key={b.id} className={`bubble ${b.type}`} style={{ left: b.x, top: b.y, width: b.w, height: b.h }}>
                          <div style={{padding:"2px 0"}}>{b.text}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto py-3 text-center text-muted small">Tip: drag bubbles, upload panel images, change fit, then Preview → Export.</footer>
    </div>
  );
}
