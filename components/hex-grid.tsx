"use client"

import { useEffect, useRef } from "react"

export function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Hex grid parameters
    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalSpacing = hexHeight
    const hexHorizontalSpacing = hexWidth * 0.75

    // Draw a single hexagon
    const drawHexagon = (x: number, y: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + hexSize * Math.cos(angle)
        const hy = y + hexSize * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set line style
      ctx.strokeStyle = "rgba(32, 242, 255, 0.2)"
      ctx.lineWidth = 1

      // Calculate number of rows and columns
      const rows = Math.ceil(canvas.height / hexVerticalSpacing) + 1
      const cols = Math.ceil(canvas.width / hexHorizontalSpacing) + 1

      // Draw hex grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
          const y = row * hexVerticalSpacing

          // Only draw if within canvas bounds with some margin
          if (x > -hexWidth && x < canvas.width + hexWidth && y > -hexHeight && y < canvas.height + hexHeight) {
            drawHexagon(x, y)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0" />
}
