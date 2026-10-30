import React, { useState } from 'react';
import { X, Layers, Check, Copy, ExternalLink, ShieldCheck, Terminal, Globe, Cloud } from 'lucide-react';

interface AwsDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsDeploymentModal: React.FC<AwsDeploymentModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const s3PolicyCode = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::skycast-weather-app/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E123EXAMPLE"
        }
      }
    }
  ]
}`;

  const cliCommands = `# 1. Build optimized static production bundle
npm run build

# 2. Sync build output to Amazon S3 bucket
aws s3 sync dist/ s3://skycast-weather-app --delete

# 3. Invalidate CloudFront edge cache for instant global rollout
aws cloudfront create-invalidation \\
  --distribution-id E123EXAMPLE \\
  --paths "/*"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080e1d]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0f172a] border border-white/15 p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                AWS Cloud Deployment Architecture
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Production-grade static website hosting on Amazon Web Services (AWS)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mt-6 text-sm text-slate-300">
          {/* Architecture Pipeline Diagram */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mb-3">
              Target Multi-Tier Cloud Architecture
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-white/5">
                <Cloud className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                <div className="font-bold text-white">1. Amazon S3</div>
                <div className="text-[11px] text-slate-400 mt-1">Origin storage for compiled HTML/JS/CSS assets</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-white/5">
                <Globe className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <div className="font-bold text-white">2. CloudFront CDN</div>
                <div className="text-[11px] text-slate-400 mt-1">Global edge caching & sub-50ms latency</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-white/5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="font-bold text-white">3. AWS ACM</div>
                <div className="text-[11px] text-slate-400 mt-1">Free auto-renewing SSL/TLS HTTPS certificates</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-white/5">
                <Terminal className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="font-bold text-white">4. Route 53</div>
                <div className="text-[11px] text-slate-400 mt-1">DNS routing with alias records to CloudFront</div>
              </div>
            </div>
          </div>

          {/* Step 1: Compilation */}
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              Compile Static Distribution Bundle
            </h3>
            <p className="text-xs text-slate-400 mt-1 pl-8">
              Execute Vite build to compile optimized production assets into the <code className="text-[#38bdf8]">dist/</code> directory.
            </p>
          </div>

          {/* Step 2: S3 Bucket & Security */}
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              Amazon S3 & Origin Access Control (OAC)
            </h3>
            <p className="text-xs text-slate-400 mt-1 pl-8">
              Rather than exposing your S3 bucket to public anonymous traffic, modern AWS best practice uses <strong>Origin Access Control (OAC)</strong>. The bucket remains private, accessible only through CloudFront.
            </p>

            <div className="relative mt-3 pl-8">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-xs overflow-x-auto text-slate-300">
                <pre>{s3PolicyCode}</pre>
              </div>
              <button
                onClick={() => handleCopy(s3PolicyCode, 'policy')}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 text-xs flex items-center gap-1"
              >
                {copiedKey === 'policy' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 3: Deployment CLI */}
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] font-mono text-xs flex items-center justify-center font-bold">
                3
              </span>
              Automated Deployment via AWS CLI / CI/CD
            </h3>
            <p className="text-xs text-slate-400 mt-1 pl-8">
              Commands to synchronize assets and flush the CDN cache during automated GitHub Actions or terminal deployments:
            </p>

            <div className="relative mt-3 pl-8">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-xs overflow-x-auto text-emerald-300">
                <pre>{cliCommands}</pre>
              </div>
              <button
                onClick={() => handleCopy(cliCommands, 'cli')}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 text-xs flex items-center gap-1"
              >
                {copiedKey === 'cli' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CLI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Security & Secret Handling Notice */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <strong className="font-semibold block mb-1">AWS & Cloud Security Guarantee:</strong>
            This frontend is completely client-side and interacts with public open meteorological endpoints. No AWS access keys or secret credentials ever exist in the client code.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-white/10 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
