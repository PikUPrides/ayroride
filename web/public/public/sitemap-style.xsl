<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 75rem;
            margin: 0 auto;
            padding: 2rem;
            background-color: #f9fafb;
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #111827;
          }
          p {
            color: #6b7280;
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            transition: color 0.2s;
          }
          a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          th {
            background-color: #f3f4f6;
            text-align: left;
            padding: 1rem;
            font-weight: 600;
            color: #374151;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #e5e7eb;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #f9fafb;
          }
          .count {
            background-color: #dbeafe;
            color: #1e40af;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-left: 1rem;
          }
          @media (max-width: 640px) {
            body { padding: 1rem; }
            th, td { padding: 0.75rem; }
            .mobile-hidden { display: none; }
          }
        </style>
      </head>
      <body>
        <div id="content">
          <h1>XML Sitemap</h1>
          
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <p>
              This XML Sitemap Index file contains <span class="count"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span> sitemaps.
            </p>
            <table>
              <thead>
                <tr>
                  <th width="70%">Sitemap</th>
                  <th width="30%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          
          <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
            <p>
              This XML Sitemap contains <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> URLs.
            </p>
            <table>
              <thead>
                <tr>
                  <th width="60%">URL</th>
                  <th width="15%" class="mobile-hidden">Priority</th>
                  <th width="15%" class="mobile-hidden">Change Freq</th>
                  <th width="10%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td class="mobile-hidden">
                      <xsl:value-of select="concat(sitemap:priority*100,'%')"/>
                    </td>
                    <td class="mobile-hidden">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
