export function StatusWidget() {
  return (
    <section
      className="desktop-widget status-widget identity-widget"
      aria-label="Mourad Kraiem portfolio introduction"
    >
      <header className="identity-widget-header">
        <span>IDENTITY.NODE</span>

        <span className="status-led">
          ONLINE
        </span>
      </header>

      <div className="identity-widget-main">
        <p className="identity-system">
          PERSONAL ENGINEERING SYSTEM // TUN-01
        </p>

        <h1>Mourad Kraiem</h1>

        <p className="identity-role">
          Computer Science Engineering Student
        </p>

        <div className="identity-divider" />

        <strong className="identity-specialty">
          Artificial Intelligence &amp; Machine Learning
        </strong>

        <p className="identity-welcome">
          Welcome to the Lab.
        </p>
      </div>

      <div className="identity-meta">
        <span>
          <small>STATUS</small>
          <strong>STUDENT</strong>
        </span>

        <span>
          <small>FOCUS</small>
          <strong>AI / ML</strong>
        </span>

        <span>
          <small>AVAILABLE</small>
          <strong>FEB 2027</strong>
        </span>
      </div>

      <footer className="identity-widget-footer">
        <span>OSKR://PROFILE</span>
        <span>DRAG TO REPOSITION</span>
      </footer>
    </section>
  );
}