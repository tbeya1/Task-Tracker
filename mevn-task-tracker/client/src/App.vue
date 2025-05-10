<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/" exact-active-class="active-link">Home</router-link>
        <router-link to="/about" exact-active-class="active-link">About</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 Task Tracker web</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
}

/* Header */
header {
  background-color: #42b983;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: opacity 0.2s;
}

nav a:hover {
  opacity: 0.8;
}

.active-link {
  border-bottom: 2px solid white;
}

/* Main */
main {
  flex: 1;
  padding: 2rem;
}

/* Footer */
footer {
  background-color: #42b983;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.95rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}
</style>
