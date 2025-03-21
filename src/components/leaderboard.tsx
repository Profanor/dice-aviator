import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type MyBetsSubTab = 'ongoing' | 'ended';
type TopSubTab = 'day' | 'month' | 'year';

interface TabContentProps {
  activeTab: string;
  ongoingBets: Array<{ id: string; score: number; currentWin: number }>;
  endedBets: Array<{ id: string; betAmount: number; status: string }>;
  topPlayers: {
    [key: string]: Array<{ date: string; avatar: string; betAmount: number; winAmount: number; round: number }>;
  };
  myBetsSubTab: string;
  topSubTab: string;
  setMyBetsSubTab: Dispatch<SetStateAction<MyBetsSubTab>>;
  setTopSubTab: Dispatch<SetStateAction<TopSubTab>>;
  leaderboard: Array<{ name: string; score: number; status: string }>;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  ongoingBets,
  endedBets,
  topPlayers,
  myBetsSubTab,
  setMyBetsSubTab,
  topSubTab,
  setTopSubTab,
  leaderboard,
}) => {
  // render the content based on the active tab
  switch (activeTab) {
    case 'leaderboard':
      return (
        <>
          {/* leaderboard header */}
          <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-gray-400 font-semibold border-b border-gray-700 pb-2">
            <div>Player</div>
            <div>Score</div>
            <div>Current Win</div>
          </div>

          {leaderboard.slice(-5).map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`grid grid-cols-3 gap-2 py-2 px-3 mb-2 rounded-md ${
                entry.status === 'win'
                  ? 'bg-green-500/20 border border-green-500/50'
                  : entry.status === 'loss'
                    ? 'bg-red-500/20 border border-red-500/50'
                    : index === 0
                      ? 'bg-yellow-500/20 border border-yellow-500/50'
                      : index === 1
                        ? 'bg-gray-400/20 border border-gray-400/50'
                        : index === 2
                          ? 'bg-amber-700/20 border border-amber-700/50'
                          : 'bg-gray-700/50'
              }`}
            >
              <div className="truncate">{entry.name}</div>
              <div>{entry.score}</div>
              <div
                className={`font-bold ${
                  entry.status === 'win'
                    ? 'text-green-500'
                    : entry.status === 'loss'
                      ? 'text-red-500'
                      : 'text-yellow-400'
                }`}
              >
                {entry.score * 50}
              </div>
            </motion.div>
          ))}

          {leaderboard.length === 0 && (
            <div className="text-gray-400 text-sm italic py-2 text-center">No players yet</div>
          )}
        </>
      );

      {
        /* TAB MY BETS */
      }
    case 'mybets':
      return (
        <>
          {/* My Bets sub-tabs */}
          <div className="flex mb-4 border-b border-gray-700">
            <button
              onClick={() => setMyBetsSubTab('ongoing')}
              className={`px-4 py-2 text-sm font-medium ${
                myBetsSubTab === 'ongoing'
                  ? 'text-sky-400 border-b-2 border-sky-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setMyBetsSubTab('ended')}
              className={`px-4 py-2 text-sm font-medium ${
                myBetsSubTab === 'ended'
                  ? 'text-sky-400 border-b-2 border-sky-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Ended
            </button>
          </div>

          {myBetsSubTab === 'ongoing' ? (
            <>
              {/* Ongoing bets header */}
              <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-gray-400 font-semibold border-b border-gray-700 pb-2">
                <div>Bet ID</div>
                <div>Score</div>
                <div>Current Win</div>
              </div>

              {ongoingBets.map((bet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="grid grid-cols-3 gap-2 py-2 px-3 mb-2 rounded-md bg-gray-700/50"
                >
                  <div className="text-xs font-medium">{bet.id}</div>
                  <div className="text-yellow-400 font-bold">{bet.score}</div>
                  <div className="text-green-500 font-bold">{bet.currentWin}</div>
                </motion.div>
              ))}

              {ongoingBets.length === 0 && (
                <div className="text-gray-400 text-sm italic py-2 text-center">No ongoing bets</div>
              )}
            </>
          ) : (
            <>
              {/* Ended bets header */}
              <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-gray-400 font-semibold border-b border-gray-700 pb-2">
                <div>Bet ID</div>
                <div>Bet Amount</div>
                <div>Status</div>
              </div>

              {endedBets.map((bet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`grid grid-cols-3 gap-2 py-2 px-3 mb-2 rounded-md ${
                    bet.status === 'win'
                      ? 'bg-green-500/20 border border-green-500/50'
                      : 'bg-red-500/20 border border-red-500/50'
                  }`}
                >
                  <div className="text-xs font-medium">{bet.id}</div>
                  <div className="text-xs font-medium">{bet.betAmount}</div>
                  <div className="flex items-center">
                    {bet.status === 'win' ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />{' '}
                        <span className="text-green-500 text-xs font-medium">Win</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 text-red-500 mr-1" />{' '}
                        <span className="text-red-500 text-xs font-medium">Loss</span>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {endedBets.length === 0 && (
                <div className="text-gray-400 text-sm italic py-2 text-center">No ended bets</div>
              )}
            </>
          )}
        </>
      );
    case 'top':
      return (
        <>
          {/* Top sub-tabs with proper spacing */}
          <div className="flex mb-6 border-b border-gray-700 space-x-8 justify-center">
            <button
              onClick={() => setTopSubTab('day')}
              className={`px-6 py-2 text-sm font-medium ${
                topSubTab === 'day' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setTopSubTab('month')}
              className={`px-6 py-2 text-sm font-medium ${
                topSubTab === 'month' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTopSubTab('year')}
              className={`px-6 py-2 text-sm font-medium ${
                topSubTab === 'year' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Year
            </button>
          </div>

          {topPlayers[topSubTab].map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center px-6 py-5 mb-4 rounded-lg bg-gray-700/50"
            >
              {/* Trophy & Date */}
              <div className="flex flex-col items-center mr-10">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-[10px] text-gray-300">{player.date}</span>
              </div>

              {/* Avatar */}
              <div className="flex items-center justify-center bg-gray-600 rounded-full h-8 w-8 text-white font-bold mr-6">
                {player.avatar}
              </div>

              {/* Player Stats */}
              <div className="flex flex-col ml-12">
                <div className="grid grid-cols-2">
                  <span className="text-[10px] text-gray-400">Bet Amount: </span>
                  <span className="text-[11px] text-white">{player.betAmount}</span>

                  <span className="text-[10px] text-gray-400">Win Amount: </span>
                  <span className="text-[11px] text-yellow-500">{player.winAmount}</span>

                  <span className="text-[10px] text-gray-400">Round: </span>
                  <span className="text-[11px] text-white">{player.round}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {topPlayers[topSubTab].length === 0 && (
            <div className="text-gray-400 text-sm italic py-2 text-center">No top players yet</div>
          )}
        </>
      );
  }
};
