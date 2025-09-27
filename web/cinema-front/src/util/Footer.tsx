
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 footer">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5>Contato</h5>
          <p><i className="fas fa-envelope"></i> <a
              href="mailto:contato@cinetop.com">contato@cinetop.com</a></p>
          <p><i className="fas fa-phone"></i> (21) 2653-8382</p>
        </div>
        <div className="col-md-4 align-self-center">
          <h5>Instagram</h5>
          <a href='#'><i className="fab fa-instagram"></i> CineTop</a>
        </div>
        <div className="col-md-4 align-self-center">
          <h5>&copy; 2025 CineTop</h5>
        </div>
      </div>
    </div>

  </footer>
  )
}
export default Footer
