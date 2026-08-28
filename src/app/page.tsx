'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Shield, Activity, Brain, AlertTriangle, CheckCircle2, 
  TrendingUp, TrendingDown, Zap, Globe, Lock, Bot, Users, Target,
  ArrowRight, Play, Pause, RefreshCw, Settings, Bell,
  ChevronRight, Star, Clock, MapPin,
  Package, Truck, Factory, Database, Cpu,
  Eye, BarChart3, LineChart as LineChartIcon, PieChart,
  Sun, Moon, Monitor, Maximize2, Download,
  Sparkles, Waves, Navigation, Compass,
  ShieldAlert, ShieldCheck, Fingerprint,
  Layers, Network, Radio, Satellite,
  Thermometer, Droplets, Wind,
  ArrowUpRight, ArrowDownRight, Minus,
  Filter, Search, MoreVertical,
  LayoutDashboard, FileBarChart, MessageCircle,
  UserCheck, Building2, CreditCard, DollarSign, Mail,
  XCircle, CheckCircle, AlertCircle,
  SkipForward, SkipBack
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// Chart imports
import { 
  AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart as RechartsPieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Legend,
  Treemap
} from 'recharts'

// Types
interface Supplier {
  id: string
  name: string
  region: string
  riskScore: number
  status: 'active' | 'warning' | 'critical' | 'inactive'
  category: string
  lastAudit: string
  compliance: number
  esgScore: number
}

interface RiskAlert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  supplier: string
  region: string
  timestamp: Date
  impact: 'high' | 'medium' | 'low'
  category: string
}

interface MetricData {
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  label: string
}

// Color palette - Enterprise AI theme
const COLORS = {
  primary: '#10B981',
  secondary: '#06B6D4',
  accent: '#8B5CF6',
  warning: '#F59E0B',
  danger: '#EF4444',
  success: '#22C55E',
  dark: '#0F172A',
  light: '#F8FAFC',
  gradientStart: '#059669',
  gradientEnd: '#0891B2'
}

const CHART_COLORS = ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B', '#EF4444', '#22C55E', '#3B82F6', '#EC4899']

// Mock Data Generators
const generateSuppliers = (): Supplier[] => [
  { id: '1', name: 'Shanghai Advanced Materials Co.', region: 'Asia Pacific', riskScore: 78, status: 'warning', category: 'Raw Materials', lastAudit: '2025-01-15', compliance: 87, esgScore: 72 },
  { id: '2', name: 'Nordic Components AB', region: 'Europe', riskScore: 23, status: 'active', category: 'Electronics', lastAudit: '2025-01-20', compliance: 96, esgScore: 91 },
  { id: '3', name: 'BrazilAgro Commodities SA', region: 'Latin America', riskScore: 89, status: 'critical', category: 'Agriculture', lastAudit: '2024-11-10', compliance: 64, esgScore: 45 },
  { id: '4', name: 'TechComp Ltd.', region: 'Asia Pacific', riskScore: 34, status: 'active', category: 'Technology', lastAudit: '2025-02-01', compliance: 94, esgScore: 88 },
  { id: '5', name: 'EuroParts GmbH', region: 'Europe', riskScore: 45, status: 'active', category: 'Automotive', lastAudit: '2025-01-28', compliance: 91, esgScore: 85 },
  { id: '6', name: 'AsiaLogistics Pte.', region: 'Asia Pacific', riskScore: 56, status: 'warning', category: 'Logistics', lastAudit: '2024-12-15', compliance: 79, esgScore: 68 },
  { id: '7', name: 'Global Manufacturing Co.', region: 'North America', riskScore: 12, status: 'active', category: 'Manufacturing', lastAudit: '2025-02-05', compliance: 98, esgScore: 95 },
  { id: '8', name: 'Steel Works SA', region: 'Latin America', riskScore: 67, status: 'warning', category: 'Raw Materials', lastAudit: '2024-12-20', compliance: 73, esgScore: 58 }
]

const generateRiskTrendData = () => {
  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
  return months.map((month, i) => ({
    month,
    overallRisk: 35 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
    supplyChain: 30 + Math.cos(i * 0.6) * 15 + Math.random() * 8,
    financial: 25 + Math.sin(i * 0.5) * 12 + Math.random() * 6,
    operational: 40 + Math.cos(i * 0.7) * 18 + Math.random() * 9
  }))
}

const generateRegionalData = () => [
  { region: 'Asia Pacific', high: 120, medium: 280, low: 450, suppliers: 487 },
  { region: 'Europe', high: 65, medium: 190, low: 380, suppliers: 342 },
  { region: 'North America', high: 45, medium: 150, low: 420, suppliers: 298 },
  { region: 'Latin America', high: 89, medium: 120, low: 180, suppliers: 120 }
]

const generateDemandForecastData = () => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  return weeks.map((week, i) => ({
    week,
    actual: 1100 + Math.random() * 200,
    predicted: 1150 + Math.sin(i * 0.5) * 100,
    upperBound: 1250 + Math.random() * 50,
    lowerBound: 1050 - Math.random() * 50
  }))
}

const generateAlerts = (): RiskAlert[] => [
  {
    id: '1',
    type: 'critical',
    title: 'UFLPA Entity List Match Detected',
    description: 'Shanghai Advanced Materials flagged for potential UFLPA Entity List connection.',
    supplier: 'Shanghai Advanced Materials Co.',
    region: 'Asia Pacific',
    timestamp: new Date(Date.now() - 1800000),
    impact: 'high',
    category: 'compliance'
  },
  {
    id: '2',
    type: 'warning',
    title: 'EUDR Deforestation Risk Identified',
    description: 'BrazilAgro sourcing area shows satellite-detected deforestation activity.',
    supplier: 'BrazilAgro Commodities SA',
    region: 'Latin America',
    timestamp: new Date(Date.now() - 3600000),
    impact: 'high',
    category: 'environmental'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Compliance Regulation Announced',
    description: 'Global Manufacturing Co. affected by new EU CSRD reporting requirements.',
    supplier: 'Global Manufacturing Co.',
    region: 'North America',
    timestamp: new Date(Date.now() - 7200000),
    impact: 'medium',
    category: 'regulatory'
  },
  {
    id: '4',
    type: 'warning',
    title: 'Port Congestion at Singapore',
    description: 'AsiaLogistics shipments experiencing 3-5 day delays due to port congestion.',
    supplier: 'AsiaLogistics Pte.',
    region: 'Asia Pacific',
    timestamp: new Date(Date.now() - 10800000),
    impact: 'medium',
    category: 'logistics'
  }
]

// Main Component
export default function AISupplyChainCommandCenter() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [isLive, setIsLive] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animatedMetrics, setAnimatedMetrics] = useState({ suppliers: 0, riskScore: 0, alerts: 0, accuracy: 0 })

  // Data states
  const [suppliers] = useState<Supplier[]>(generateSuppliers())
  const [alerts, setAlerts] = useState<RiskAlert[]>(generateAlerts())
  const [riskTrendData] = useState(generateRiskTrendData())
  const [regionalData] = useState(generateRegionalData())
  const [demandForecastData] = useState(generateDemandForecastData())

  // Live clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Animate metrics on mount
  useEffect(() => {
    const duration = 2000
    const steps = 60
    let step = 0
    
    const animate = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setAnimatedMetrics({
        suppliers: Math.round(1247 * easeOut),
        riskScore: Math.round(42.3 * easeOut * 10) / 10,
        alerts: Math.round(18 * easeOut),
        accuracy: Math.round(94.2 * easeOut * 10) / 10
      })
      
      if (step >= steps) clearInterval(animate)
    }, duration / steps)
    
    return () => clearInterval(animate)
  }, [])

  // Simulate live alerts
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      const newAlert: RiskAlert = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'warning' : 'info',
        title: ['Currency fluctuation detected', 'Weather alert issued', 'Supplier performance update', 'Compliance check completed'][Math.floor(Math.random() * 4)],
        description: 'Automated monitoring system update',
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)].name,
        region: ['Asia Pacific', 'Europe', 'North America', 'Latin America'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        category: ['operational', 'financial', 'environmental'][Math.floor(Math.random() * 3)]
      }
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 9)])
    }, 15000)
    
    return () => clearInterval(interval)
  }, [isLive, suppliers])

  // Computed values
  const filteredSuppliers = useMemo(() => {
    if (selectedRegion === 'all') return suppliers
    return suppliers.filter(s => s.region === selectedRegion)
  }, [suppliers, selectedRegion])

  const riskDistribution = useMemo(() => [
    { name: 'Critical', value: suppliers.filter(s => s.status === 'critical').length, color: COLORS.danger },
    { name: 'High', value: suppliers.filter(s => s.riskScore > 60 && s.status !== 'critical').length, color: COLORS.warning },
    { name: 'Medium', value: suppliers.filter(s => s.riskScore >= 30 && s.riskScore <= 60).length, color: COLORS.secondary },
    { name: 'Low', value: suppliers.filter(s => s.riskScore < 30).length, color: COLORS.success }
  ], [suppliers])

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return `${Math.floor(hours / 24)} days ago`
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg p-3 shadow-xl`}>
          <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'}`}>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl ${isDarkMode ? 'bg-slate-90/80 border-b border-white/10' : 'bg-white/80 border-b border-gray-200'} shadow-lg`}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Supply Chain
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Command Center v3.0</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {['Dashboard', 'Suppliers', 'Risk Intel', 'Forecasting', 'Compliance'].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    item === 'Dashboard' 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25' 
                      : isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Live Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">LIVE</span>
              </div>

              {/* Time */}
              <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono">{currentTime.toLocaleTimeString()}</span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-gray-100 text-indigo-500'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <button className={`relative p-2 rounded-lg ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* CTA Button */}
              <Button className="hidden sm:flex bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25">
                <Zap className="w-4 h-4 mr-2" />
                Run Analysis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Suppliers Monitored', value: animatedMetrics.suppliers.toLocaleString(), icon: Users, change: '+3.2%', trend: 'up' as const, color: 'from-blue-500 to-cyan-500' },
            { label: 'Avg Risk Score', value: animatedMetrics.riskScore.toFixed(1), icon: ShieldAlert, change: '-2.1%', trend: 'down' as const, color: 'from-amber-500 to-orange-500' },
            { label: 'Active Alerts', value: animatedMetrics.alerts, icon: AlertTriangle, change: '+5', trend: 'up' as const, color: 'from-red-500 to-pink-500' },
            { label: 'AI Prediction Accuracy', value: `${animatedMetrics.accuracy}%`, icon: Brain, change: '+1.2%', trend: 'up' as const, color: 'from-emerald-500 to-green-500' }
          ].map((metric, index) => (
            <Card key={index} className={`relative overflow-hidden ${isDarkMode ? 'bg-slate-800/50 border-white/10 backdrop-blur-sm' : 'bg-white/80 border-gray-200 backdrop-blur-sm'} hover:shadow-xl transition-all group`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    metric.trend === 'up' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {metric.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{metric.value}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{metric.label}</p>
                </div>
              </CardContent>
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${metric.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Risk Trend Analysis - Takes 2 columns */}
          <Card className={`xl:col-span-2 ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-emerald-400" />
                  Risk Trend Analysis
                </CardTitle>
                <CardDescription>6-month risk trajectory by category</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Bot className="w-3 h-3" />
                  AI Powered
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)}>
                  {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e5e7eb'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#6b7280'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="overallRisk" name="Overall Risk" stroke="#10B981" fillOpacity={1} fill="url(#colorOverall)" strokeWidth={2} />
                  <Area type="monotone" dataKey="supplyChain" name="Supply Chain" stroke="#06B6D4" fillOpacity={1} fill="url(#colorSupply)" strokeWidth={2} />
                  <Line type="monotone" dataKey="financial" name="Financial" stroke="#8B5CF6" strokeWidth={2} dot={{fill: '#8B5CF6'}} />
                  <Line type="monotone" dataKey="operational" name="Operational" stroke="#F59E0B" strokeWidth={2} dot={{fill: '#F59E0B'}} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Distribution Pie */}
          <Card className={`${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-cyan-400" />
                  Supplier Risk Distribution
                </span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
              <CardDescription>Risk concentration analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RechartsPieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Demand Forecast */}
          <Card className={`xl:col-span-2 ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  Demand Forecast vs Actual
                </CardTitle>
                <CardDescription>AI-powered demand prediction accuracy</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="w-3 h-3" />
                ML Model v2.4
              </Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demandForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e5e7eb'} />
                  <XAxis dataKey="week" stroke={isDarkMode ? '#94a3b8' : '#6b7280'} />
                  <YAxis stroke={isDarkMode ? '#94a3b8' : '#6b7280'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="actual" name="Actual" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" name="Predicted" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Risk */}
          <Card className={`${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                Regional Risk
              </CardTitle>
              <CardDescription>Supplier concentration by geography</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {regionalData.map((region) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{region.region}</span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{region.suppliers} suppliers</span>
                  </div>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-700/50">
                    <div 
                      className="bg-red-500 transition-all hover:opacity-80" 
                      style={{ width: `${(region.high / region.suppliers) * 100}%` }}
                      title={`High: ${region.high}`}
                    />
                    <div 
                      className="bg-amber-500 transition-all hover:opacity-80" 
                      style={{ width: `${(region.medium / region.suppliers) * 100}%` }}
                      title={`Medium: ${region.medium}`}
                    />
                    <div 
                      className="bg-emerald-500 transition-all hover:opacity-80" 
                      style={{ width: `${(region.low / region.suppliers) * 100}%` }}
                      title={`Low: ${region.low}`}
                    />
                  </div>
                </div>
              ))}
              
              <Separator className={isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} />
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> High</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Medium</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Low</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Alerts Feed */}
        <Card className={`${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400 animate-pulse" />
                Live Risk Alerts
              </CardTitle>
              <CardDescription>Real-time threat intelligence stream</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLive(!isLive)}
                className={isLive ? 'border-red-500 text-red-500' : ''}
              >
                {isLive ? <><Pause className="w-4 h-4 mr-1" /> Pause</> : <><Play className="w-4 h-4 mr-1" /> Resume</>}
              </Button>
              <Badge variant="secondary" className="gap-1">
                <Radio className="w-3 h-3" />
                Real-time
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                    alert.type === 'critical' 
                      ? isDarkMode ? 'bg-red-500/10 border-red-500/25' : 'bg-red-50 border-red-200'
                      : alert.type === 'warning'
                        ? isDarkMode ? 'bg-amber-500/10 border-amber-500/25' : 'bg-amber-50 border-amber-200'
                        : isDarkMode ? 'bg-blue-500/10 border-blue-500/25' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={
                          alert.type === 'critical' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : alert.type === 'warning'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {alert.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatTime(alert.timestamp)}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Fingerprint className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{alert.title}</h4>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Building2 className="w-3 h-3" />
                        {alert.supplier}
                      </span>
                      <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MapPin className="w-3 h-3" />
                        {alert.region}
                      </span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        alert.impact === 'high' 
                          ? 'bg-red-500/20 text-red-400'
                          : alert.impact === 'medium'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-green-500/20 text-green-400'
                      }
                    >
                      Impact: {alert.impact}
                    </Badge>
                  </div>
                  
                  {/* SHAP Explainability Toggle */}
                  <details className="mt-3 group">
                    <summary className={`cursor-pointer text-xs flex items-center gap-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} hover:underline`}>
                      <Brain className="w-3 h-3" />
                      Show AI Explanation (SHAP)
                    </summary>
                    <div className={`mt-2 p-3 rounded-lg text-xs ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-2 gap-2">
                        <div><strong>Feature Importance:</strong></div>
                        <div>Geopolitical: 42%, Financial: 28%, ESG: 18%, Operational: 12%</div>
                        <div><strong>Confidence:</strong></div>
                        <div>{(85 + Math.random() * 12).toFixed(1)}%</div>
                        <div><strong>Model Used:</strong></div>
                        <div>XGBoost Ensemble v3.2</div>
                        <div><strong>Data Points:</strong></div>
                        <div>{(1200 + Math.floor(Math.random() * 800)).toLocaleString()}</div>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </main>

      {/* Footer */}
      <footer className={`mt-auto py-6 border-t ${isDarkMode ? 'border-white/10 bg-slate-900/50' : 'border-gray-200 bg-white/50'}`}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">Supply Chain Command Center v3.0</span>
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Data refreshed: {currentTime.toLocaleString()} • AI Engine: Active • Uptime: 99.97%
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-xs">
                <Mail className="w-4 h-4 mr-1" />
                support@commandcenter.ai
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Help
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
