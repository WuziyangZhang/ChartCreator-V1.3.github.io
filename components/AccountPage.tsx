import React, { useState } from 'react';
import { User, Lock, Mail, History, CreditCard, LogOut, Save, ChevronRight, Clock, FileText, Check, Zap, Star, Users } from 'lucide-react';

interface AccountPageProps {
  onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'subscription'>('profile');
  
  // Mock User State
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'user@example.com',
    avatar: 'DU'
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [userPlan, setUserPlan] = useState('Starter');

  // Mock History Data
  const historyItems = [
    { id: 1, title: 'Q1 Sales Analysis', date: '2023-10-24', type: 'Bar Chart' },
    { id: 2, title: 'Customer Growth 2023', date: '2023-10-20', type: 'Line Chart' },
    { id: 3, title: 'Market Share Distribution', date: '2023-10-15', type: 'Pie Chart' },
    { id: 4, title: 'Product Performance', date: '2023-10-01', type: 'Scatter Plot' },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '',
      description: 'Perfect for students and hobbyists.',
      features: ['Unlimited drafts', 'Basic templates', 'PNG export'],
      icon: Zap,
      color: 'slate',
      btnStyle: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For professionals needing more power.',
      features: ['PowerPoint export', 'Brand kits', 'Priority support'],
      icon: Star,
      color: 'indigo',
      popular: true,
      btnStyle: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
    },
    {
      name: 'Team',
      price: '$29',
      period: '/month',
      description: 'Collaborate with your entire team.',
      features: ['Shared themes', 'Review workflows', 'Version history'],
      icon: Users,
      color: 'purple',
      btnStyle: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">User Center</h2>
        <p className="text-slate-500 mt-1">Manage your profile, security, and subscription settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
          <button 
             onClick={() => setActiveTab('history')}
             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
          <button 
             onClick={() => setActiveTab('subscription')}
             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'subscription' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Subscription</span>
          </button>
          
          <div className="pt-6 mt-6 border-t border-slate-200">
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* User Info Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 border-4 border-white shadow-lg">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                    <p className="text-slate-500 text-sm">{userPlan} Plan</p>
                  </div>
                </div>

                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-slate-700 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-slate-700 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <button className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* Password Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-indigo-600" />
                  Security
                </h3>
                <div className="space-y-4 max-w-lg">
                   <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Current Password</label>
                    <input 
                      type="password" 
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-slate-700 text-sm transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">New Password</label>
                      <input 
                        type="password" 
                        value={passwordForm.new}
                        onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-slate-700 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Confirm New</label>
                      <input 
                        type="password" 
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-slate-700 text-sm transition-all"
                      />
                    </div>
                  </div>
                   <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 hover:underline">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="text-lg font-bold text-slate-900">Analysis History</h3>
                   <div className="text-xs text-slate-500">Showing last 4 records</div>
                </div>
                <div className="divide-y divide-slate-100">
                   {historyItems.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center space-x-4">
                            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                               <FileText className="w-5 h-5" />
                            </div>
                            <div>
                               <h4 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                               <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {item.date}</span>
                                  <span className="px-2 py-0.5 bg-slate-100 rounded-full">{item.type}</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* SUBSCRIPTION TAB */}
          {activeTab === 'subscription' && (
            <div className="space-y-8">
               <div>
                  <h3 className="text-xl font-bold text-slate-900">Manage Plan</h3>
                  <p className="text-slate-500 text-sm mt-1">Choose the plan that fits your needs.</p>
               </div>

               {/* Pricing Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div 
                      key={plan.name} 
                      className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${userPlan === plan.name ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/30' : 'border-slate-200 bg-white hover:shadow-lg hover:border-indigo-200'}`}
                    >
                       {plan.popular && (
                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                           Most Popular
                         </div>
                       )}
                       <div className="mb-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${plan.name === 'Pro' ? 'bg-indigo-100 text-indigo-600' : plan.name === 'Team' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                            <plan.icon className="w-5 h-5" />
                          </div>
                          <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                          <div className="flex items-baseline mt-1">
                             <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                             <span className="text-sm text-slate-500 ml-1">{plan.period}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 min-h-[2.5em]">{plan.description}</p>
                       </div>
                       
                       <ul className="space-y-3 mb-8 flex-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600">
                               <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                               <span>{feature}</span>
                            </li>
                          ))}
                       </ul>

                       <button 
                         onClick={() => setUserPlan(plan.name)}
                         disabled={userPlan === plan.name}
                         className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${userPlan === plan.name ? 'bg-slate-900 text-white opacity-80 cursor-default' : plan.btnStyle || 'bg-indigo-600 text-white'}`}
                       >
                          {userPlan === plan.name ? 'Current Plan' : 'Upgrade'}
                       </button>
                    </div>
                  ))}
               </div>

               {/* Billing History */}
               <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4">Billing History</h4>
                  <table className="w-full text-sm text-left">
                     <thead className="text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                           <th className="pb-3">Date</th>
                           <th className="pb-3">Invoice</th>
                           <th className="pb-3">Amount</th>
                           <th className="pb-3 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr>
                           <td className="py-4 text-slate-600">Oct 24, 2023</td>
                           <td className="py-4 text-indigo-600 hover:underline cursor-pointer">#INV-2023-001</td>
                           <td className="py-4 text-slate-900 font-medium">$9.00</td>
                           <td className="py-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">Paid</span></td>
                        </tr>
                        <tr>
                           <td className="py-4 text-slate-600">Sep 24, 2023</td>
                           <td className="py-4 text-indigo-600 hover:underline cursor-pointer">#INV-2023-002</td>
                           <td className="py-4 text-slate-900 font-medium">$9.00</td>
                           <td className="py-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">Paid</span></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountPage;
