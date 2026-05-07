function App() {
  return (
    <AppProvider>
      <CursorBlob />
      <TopBar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Stack />
        <Projects />
        <DevOps />
        <Contact />
      </main>
      <Footer />
      <TweaksPanel />
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
