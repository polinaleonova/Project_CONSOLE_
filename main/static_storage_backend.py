# This File implements sustom static storage_backend

from django.contrib.staticfiles import storage


class CachedStaticFilesStorage(storage.CachedStaticFilesStorage):
    """
        django.contrib.staticfiles.storage.CachedStaticFilesStorage
        Extended default cached static storage bacned
        - Added processing static references in JS files
    """
    default_template = """url("%s")"""
    patterns = (
        ("*.css", (
            r"""(url\(['"]{0,1}\s*(.*?)["']{0,1}\))""",
            (r"""(@import\s*["']\s*(.*?)["'])""", """@import url("%s")"""),
        ))
    )