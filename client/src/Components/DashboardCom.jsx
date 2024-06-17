import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

export const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto text-white">
      <div className="flex-wrap flex gap-4 justify-center">
        <DashboardItem
          title="Total Users"
          count={totalUsers}
          icon={<HiOutlineUserGroup />}
          lastMonthCount={lastMonthUsers}
        />
        <DashboardItem
          title="Total Comments"
          count={totalComments}
          icon={<HiAnnotation />}
          lastMonthCount={lastMonthComments}
        />
        <DashboardItem
          title="Total Posts"
          count={totalPosts}
          icon={<HiDocumentText />}
          lastMonthCount={lastMonthPosts}
        />
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <RecentItems
          title="Recent comments"
          items={comments}
          link="/dashboard?tab=comments"
        />
      </div>
    </div>
  );
};

const DashboardItem = ({ title, count, icon, lastMonthCount }) => (
  <div className="flex flex-col p-3 bg-gray-800 gap-4 md:w-72 w-full rounded-md shadow-md">
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-md uppercase">{title}</h3>
        <p className="text-2xl">{count}</p>
      </div>
      <div className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg">
        {icon}
      </div>
    </div>
    <div className="flex gap-2 text-sm text-gray-500">
      <span className="text-green-500 flex items-center">
        <HiArrowNarrowUp />
        {lastMonthCount}
      </span>
      <div>Last month</div>
    </div>
  </div>
);

const RecentItems = ({ title, items, link }) => (
  <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-gray-800">
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2">{title}</h1>
      <Link
        to={link}
        className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        See all
      </Link>
    </div>
    <ul className="divide-y divide-gray-700">
      {items.map((item) => (
        <li key={item._id} className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <img
              src={item.profilePicture}
              alt="user"
              className="w-10 h-10 rounded-full bg-gray-500"
            />
            <span className="ml-3">{item.username}</span>
          </div>
          {item.content && (
            <p className="w-72 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.content}
            </p>
          )}
          {item.title && (
            <p className="w-72 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.title}
            </p>
          )}
          {item.numberOfLikes && <span>{item.numberOfLikes}</span>}
        </li>
      ))}
    </ul>
  </div>
);
