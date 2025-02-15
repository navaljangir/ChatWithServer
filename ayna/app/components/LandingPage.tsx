
export default function LandingPage() {
    return (
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Real-Time Chat with Instant Echo
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Experience seamless communication with our WebSocket-powered chat application. Secure, responsive, and built with modern technologies.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <a 
                  href="/signup" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Start Chatting Now
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Features Section */}
        <section id="features" className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Why Choose EchoChat?
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Real-Time Communication',
                  description: 'Instant message echo using WebSocket protocol for lightning-fast responses',
                  icon: '⚡',
                },
                {
                  title: 'Secure Authentication',
                  description: 'Strapi-powered user authentication with local storage security',
                  icon: '🔒',
                },
                {
                  title: 'Responsive Design',
                  description: 'Perfectly adapted UI for all devices - desktop, tablet, and mobile',
                  icon: '📱',
                },
                {
                  title: 'Session Management',
                  description: 'Easily switch between different chat sessions',
                  icon: '🔄',
                },
                {
                  title: 'Message History',
                  description: 'Local database storage for all your chat history',
                  icon: '💾',
                },
                {
                  title: 'Modern Stack',
                  description: 'Built with Next.js, Tailwind CSS, and Strapi',
                  icon: '🚀',
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <div className="bg-indigo-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start chatting?</span>
              <span className="block text-indigo-200">Create your free account today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <a 
                href="/signup" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-background transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} EchoChat. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }