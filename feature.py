import re
from urllib.parse import urlparse

class FeatureExtraction:
    def __init__(self, url):
        self.url = url
        self.parsed_url = urlparse(url)

    def getFeaturesList(self):
        """
        Extracts features from the given URL for phishing detection.

        Returns:
            List of features as specified.
        """
        features = [
            self.using_ip(),
            self.long_url(),
            self.short_url(),
            self.symbol_at(),
            self.redirecting_double_slash(),
            self.prefix_suffix_hyphen(),
            self.sub_domains(),
            self.https(),
            self.domain_registration_length(),
            self.favicon(),
            self.non_standard_port(),
            self.https_in_domain_url(),
            self.request_url(),
            self.anchor_url(),
            self.links_in_script_tags(),
            self.server_form_handler(),
            self.info_email(),
            self.abnormal_url(),
            self.website_forwarding(),
            self.status_bar_customization(),
            self.disable_right_click(),
            self.using_popup_window(),
            self.iframe_redirection(),
            self.age_of_domain(),
            self.dns_recording(),
            self.website_traffic(),
            self.page_rank(),
            self.google_index(),
            self.links_pointing_to_page(),
            self.stats_report()
        ]
        return features

    def using_ip(self):
        """Checks if the URL contains an IP address."""
        ip_pattern = r"(\d{1,3}\.){3}\d{1,3}"
        return 1 if re.search(ip_pattern, self.url) else 0

    def long_url(self):
        """Checks if the URL is long (>75 characters)."""
        return 1 if len(self.url) > 75 else 0

    def short_url(self):
        """Checks if the URL is short (<54 characters)."""
        return 1 if len(self.url) < 20 else 0

    def symbol_at(self):
        """Checks if the URL contains the '@' symbol."""
        return 1 if "@" in self.url else 0

    def redirecting_double_slash(self):
        """Checks if the URL contains '//' after the protocol."""
        return 1 if self.url.count('//') > 1 else 0

    def prefix_suffix_hyphen(self):
        """Checks if the domain name contains a hyphen ('-')."""
        return 1 if '-' in self.parsed_url.netloc else 0

    def sub_domains(self):
        """Counts subdomains in the URL."""
        domain_parts = self.parsed_url.netloc.split('.')
        return 1 if len(domain_parts) > 3 else 0

    def https(self):
        """Checks if the URL uses HTTPS."""
        return 1 if self.parsed_url.scheme == "https" else 0

    def domain_registration_length(self):
        """Placeholder for domain registration length (requires WHOIS data)."""
        return 0  # Placeholder

    def favicon(self):
        """Placeholder for favicon analysis (requires web scraping)."""
        return 0  # Placeholder

    def non_standard_port(self):
        """Placeholder for checking non-standard ports."""
        return 0  # Placeholder

    def https_in_domain_url(self):
        """Checks if the domain name contains 'https'."""
        return 1 if "https" in self.parsed_url.netloc.lower() else 0

    def request_url(self):
        """Placeholder for analyzing external object URLs."""
        return 0  # Placeholder

    def anchor_url(self):
        """Placeholder for anchor URL analysis."""
        return 0  # Placeholder

    def links_in_script_tags(self):
        """Placeholder for analyzing links in script tags."""
        return 0  # Placeholder

    def server_form_handler(self):
        """Placeholder for form handler analysis."""
        return 0  # Placeholder

    def info_email(self):
        """Checks if the URL contains 'mailto:'."""
        return 1 if "mailto:" in self.url.lower() else 0

    def abnormal_url(self):
        """Placeholder for abnormal URL check."""
        return 0  # Placeholder

    def website_forwarding(self):
        """Placeholder for website forwarding detection."""
        return 0  # Placeholder

    def status_bar_customization(self):
        """Placeholder for status bar customization detection."""
        return 0  # Placeholder

    def disable_right_click(self):
        """Placeholder for right-click disable detection."""
        return 0  # Placeholder

    def using_popup_window(self):
        """Placeholder for popup window detection."""
        return 0  # Placeholder

    def iframe_redirection(self):
        """Placeholder for iframe redirection detection."""
        return 0  # Placeholder

    def age_of_domain(self):
        """Placeholder for age of domain (requires WHOIS data)."""
        return 0  # Placeholder

    def dns_recording(self):
        """Placeholder for DNS recording analysis."""
        return 0  # Placeholder

    def website_traffic(self):
        """Placeholder for website traffic (requires Alexa or similar services)."""
        return 0  # Placeholder

    def page_rank(self):
        """Placeholder for page rank analysis."""
        return 0  # Placeholder

    def google_index(self):
        """Placeholder for checking Google index status."""
        return 0  # Placeholder

    def links_pointing_to_page(self):
        """Placeholder for analyzing links pointing to the page."""
        return 0  # Placeholder

    def stats_report(self):
        """Placeholder for statistical report checks."""
        return 0  # Placeholder