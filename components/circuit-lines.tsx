"use client"

import { useEffect, useRef } from "react"

export function CircuitLines() {
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

    // Circuit node class
    class Node {
      x: number
      y: number
      size: number
      connections: Node[]

      constructor(x: number, y: number, size: number) {
        this.x = x
        this.y = y
        this.size = size
        this.connections = []
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = "rgba(32, 242, 255, 0.5)"
        ctx!.fill()
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node)
          node.connections.push(this)
        }
      }

      drawConnections() {
        for (const node of this.connections) {
          ctx!.beginPath()
          ctx!.moveTo(this.x, this.y)
          ctx!.lineTo(node.x, node.y)
          ctx!.strokeStyle = "rgba(32, 242, 255, 0.3)"
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }

    // Create circuit nodes
    const nodeCount = 50
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 1

      nodes.push(new Node(x, y, size))
    }

    // Connect nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      // Connect to 1-3 other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 1

      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length)

        if (targetIndex !== i) {
          node.connect(nodes[targetIndex])
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first
      for (const node of nodes) {
        node.drawConnections()
      }

      // Then draw nodes
      for (const node of nodes) {
        node.draw()
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
