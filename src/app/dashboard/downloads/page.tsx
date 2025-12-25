"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import { Download, FileText, Shield, Clock, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface Release {
  id: string;
  version: string;
  releaseNotes: string;
  fileSize: number;
  fileSizeFormatted: string;
  isLatest: boolean;
  isBeta: boolean;
  minLicense: "FREE" | "PRO" | "LIFETIME";
  downloadCount: number;
  releasedAt: string;
}

interface UserLicense {
  type: "FREE" | "PRO" | "LIFETIME";
  status: string;
}

export default function DownloadsPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [userLicense, setUserLicense] = useState<UserLicense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [releasesRes, licenseRes] = await Promise.all([
        fetch("/api/releases"),
        fetch("/api/license/current"),
      ]);

      if (releasesRes.ok) {
        const data = await releasesRes.json();
        setReleases(data.releases || []);
      }

      if (licenseRes.ok) {
        const data = await licenseRes.json();
        setUserLicense(data.license || { type: "FREE", status: "ACTIVE" });
      } else {
        setUserLicense({ type: "FREE", status: "ACTIVE" });
      }
    } catch (err) {
      setError("Failed to load releases");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(release: Release) {
    try {
      setDownloading(release.id);
      setDownloadSuccess(null);

      const response = await fetch(`/api/releases/${release.id}/download`);

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 403) {
          setError(`Upgrade to ${data.requiredLicense} license to download this version`);
        } else {
          setError(data.error || "Download failed");
        }
        return;
      }

      // Get the blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SocialNetworkArmy-v${release.version}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloadSuccess(release.id);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      setError("Download failed. Please try again.");
      console.error(err);
    } finally {
      setDownloading(null);
    }
  }

  function canDownload(release: Release): boolean {
    if (!userLicense) return false;
    const hierarchy = { FREE: 0, PRO: 1, LIFETIME: 2 };
    return hierarchy[userLicense.type] >= hierarchy[release.minLicense];
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function parseReleaseNotes(notes: string): string[] {
    return notes.split("\n").filter((line) => line.trim());
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-info" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Downloads</h1>
        <p className="text-muted">
          Download the latest version of SocialNetworkArmy.
          {userLicense && (
            <span className="ml-2">
              Your license: <Badge variant={userLicense.type === "FREE" ? "default" : "success"}>{userLicense.type}</Badge>
            </span>
          )}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
          <p className="text-error">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-error hover:text-white"
          >
            &times;
          </button>
        </div>
      )}

      {/* System requirements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            System Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted mb-1">OS</p>
              <p className="text-white">Windows 10/11</p>
            </div>
            <div>
              <p className="text-muted mb-1">Framework</p>
              <p className="text-white">.NET 9.0</p>
            </div>
            <div>
              <p className="text-muted mb-1">RAM</p>
              <p className="text-white">4 GB minimum</p>
            </div>
            <div>
              <p className="text-muted mb-1">Storage</p>
              <p className="text-white">100 MB free</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Releases */}
      {releases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted">No releases available yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {releases.map((release) => (
            <Card
              key={release.id}
              className={release.isLatest ? "border-info" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        v{release.version}
                      </h3>
                      {release.isLatest && (
                        <Badge variant="success">Latest</Badge>
                      )}
                      {release.isBeta && <Badge variant="warning">Beta</Badge>}
                      {release.minLicense !== "FREE" && (
                        <Badge variant="pro">{release.minLicense}</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-3">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                        {formatDate(release.releasedAt)}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 flex-shrink-0" />
                        {release.fileSizeFormatted}
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1 flex-shrink-0" />
                        {release.downloadCount} downloads
                      </span>
                    </div>

                    <ul className="space-y-1">
                      {parseReleaseNotes(release.releaseNotes).map((change, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted flex items-start"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-info mr-2 mt-1.5 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-shrink-0">
                    {!canDownload(release) ? (
                      <Button variant="outline" disabled>
                        {release.minLicense} Only
                      </Button>
                    ) : (
                      <Button
                        variant={release.isLatest ? "pro" : "outline"}
                        className="w-full md:w-auto"
                        onClick={() => handleDownload(release)}
                        disabled={downloading === release.id}
                      >
                        {downloading === release.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Downloading...
                          </>
                        ) : downloadSuccess === release.id ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Downloaded!
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
