import React, { useEffect, useState } from 'react';
import { account } from '../services/appwrite';
import { Activity, CheckCircle, XCircle } from 'lucide-react';

const AppwriteStatus: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // Just try to get the current session or account info
                await account.get();
                setStatus('connected');
            } catch (err: any) {
                // 401 means not logged in, but the connection is working
                if (err.code === 401) {
                    setStatus('connected');
                } else {
                    setStatus('error');
                    setErrorDetails(err.message || 'Unknown error');
                }
            }
        };

        checkConnection();
    }, []);

    return (
        <div className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                {status === 'loading' && <Activity className="text-blue-500 animate-spin" size={20} />}
                {status === 'connected' && <CheckCircle className="text-emerald-500" size={20} />}
                {status === 'error' && <XCircle className="text-rose-500" size={20} />}

                <div>
                    <h4 className="font-semibold text-sm">Appwrite Status</h4>
                    <p className="text-xs text-slate-500">
                        {status === 'loading' && 'Testing connection...'}
                        {status === 'connected' && 'Connected to Appwrite'}
                        {status === 'error' && `Connection failed: ${errorDetails}`}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={async () => {
                        try {
                            await account.get();
                            alert('Ping successful! Check your Appwrite console.');
                        } catch (err: any) {
                            if (err.code === 401) {
                                alert('Ping successful (Unauthorized just means no session)! Check your Appwrite console.');
                            } else {
                                alert(`Ping failed: ${err.message}`);
                            }
                        }
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-md font-medium transition-colors border border-slate-200"
                >
                    Send a ping
                </button>

                {status === 'error' && (
                    <button
                        onClick={() => window.location.reload()}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 border px-2 py-1 rounded"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppwriteStatus;
