function redirectToLandingPage() {
    console.log("test")
    window.location.href = "{{ url_for('display_landing_page') }}"
}