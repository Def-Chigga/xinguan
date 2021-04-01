/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : 127.0.0.1:3306
 Source Schema         : it666

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 01/04/2021 14:59:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_id` bigint unsigned NOT NULL,
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物资名称',
  `goods_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格/型号',
  `goods_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '单位',
  `goods_reverse` int(0) NOT NULL COMMENT '库存',
  `created_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1004 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '物资列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '防疫一次性口罩', '医用口罩', '个', 99, '2021-03-23 20:11:42', '2021-03-23 20:11:42');
INSERT INTO `goods` VALUES (2, '高浓度84消毒液', '120ml', '瓶', 98, NULL, NULL);
INSERT INTO `goods` VALUES (3, '医用消毒酒精', '200ml', '瓶', 97, NULL, NULL);
INSERT INTO `goods` VALUES (4, '消毒洗手液', '300ml', '瓶', 96, NULL, NULL);
INSERT INTO `goods` VALUES (5, '电子体温枪', '小型', '把', 95, NULL, NULL);
INSERT INTO `goods` VALUES (6, '水银温度计', '小型', '支', 94, NULL, NULL);
INSERT INTO `goods` VALUES (7, '肩背式喷雾器', '大型', '个', 93, '2021-03-22 20:33:12', '2021-03-22 20:33:12');
INSERT INTO `goods` VALUES (8, '手持式喷雾器', '小型', '个', 92, '2021-03-22 20:33:15', '2021-03-22 20:33:15');
INSERT INTO `goods` VALUES (9, '一次性手套', '橡胶', '双', 91, '2021-03-22 20:44:10', '2021-03-22 20:44:10');
INSERT INTO `goods` VALUES (10, '一次性垃圾袋', '中型', '卷', 90, '2021-03-22 20:59:53', '2021-03-22 20:59:53');

-- ----------------------------
-- Table structure for goods_ins
-- ----------------------------
DROP TABLE IF EXISTS `goods_ins`;
CREATE TABLE `goods_ins`  (
  `goods_in_id` bigint unsigned NOT NULL,
  `goods_in_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物资名称',
  `goods_in_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格/型号',
  `goods_in_total` int(0) NOT NULL COMMENT '数量',
  `goods_in_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '单位',
  `goods_in_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '入库人',
  `goods_in_job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '所属岗位',
  `goods_in_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '入库日期',
  `goods_in_comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '备注',
  `created_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`goods_in_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '物资入库' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_ins
-- ----------------------------
INSERT INTO `goods_ins` VALUES (8, '高浓度84消毒液', '120ml', 1, '瓶', 'admin', '管理员', '2021-03-23', NULL, '2021-03-22 23:10:13', '2021-03-22 23:10:13');
INSERT INTO `goods_ins` VALUES (9, '水银温度计', '小型', 1, '支', 'admin', '管理员', '2021-03-24', NULL, '2021-03-22 23:10:58', '2021-03-22 23:10:58');
INSERT INTO `goods_ins` VALUES (10, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-24', NULL, '2021-03-23 18:58:08', '2021-03-23 18:58:08');
INSERT INTO `goods_ins` VALUES (11, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-31', NULL, '2021-03-23 19:03:56', '2021-03-23 19:03:56');
INSERT INTO `goods_ins` VALUES (12, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-30', NULL, '2021-03-23 19:05:34', '2021-03-23 19:05:34');
INSERT INTO `goods_ins` VALUES (13, '防疫一次性口罩', '医用口罩', 1, '卷', 'admin', '管理员', '2021-03-31', NULL, '2021-03-23 19:06:07', '2021-03-23 19:06:07');
INSERT INTO `goods_ins` VALUES (14, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 19:22:29', '2021-03-23 19:22:29');
INSERT INTO `goods_ins` VALUES (21, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 19:41:24', '2021-03-23 19:41:24');
INSERT INTO `goods_ins` VALUES (22, '防疫一次性口罩', '医用口罩', 50, '卷', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 19:43:37', '2021-03-23 19:43:37');
INSERT INTO `goods_ins` VALUES (23, '防疫一次性口罩', '医用口罩', 5, '卷', 'admin', '管理员', '2021-04-09', NULL, '2021-03-23 19:44:40', '2021-03-23 19:44:40');

-- ----------------------------
-- Table structure for goods_outs
-- ----------------------------
DROP TABLE IF EXISTS `goods_outs`;
CREATE TABLE `goods_outs`  (
  `goods_out_id` bigint unsigned NOT NULL,
  `goods_out_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物资名称',
  `goods_out_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '规格/型号',
  `goods_out_total` int(0) NOT NULL COMMENT '数量',
  `goods_out_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '单位',
  `goods_out_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '领用人',
  `goods_out_job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '所属岗位',
  `goods_out_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '领用日期',
  `goods_out_comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '备注',
  `created_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`goods_out_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '物资领用' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_outs
-- ----------------------------
INSERT INTO `goods_outs` VALUES (1, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 18:53:49', '2021-03-23 18:53:49');
INSERT INTO `goods_outs` VALUES (2, '防疫一次性口罩', '医用口罩', 3, '个', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 19:51:00', '2021-03-23 19:51:00');
INSERT INTO `goods_outs` VALUES (3, '防疫一次性口罩', '医用口罩', 10, '卷', 'admin', '管理员', '2021-03-25', NULL, '2021-03-23 19:54:12', '2021-03-23 19:54:12');
INSERT INTO `goods_outs` VALUES (9, '防疫一次性口罩', '医用口罩', 1, '个', 'admin', '管理员', '2021-03-23', NULL, '2021-03-23 20:11:42', '2021-03-23 20:11:42');

-- ----------------------------
-- Table structure for healths
-- ----------------------------
DROP TABLE IF EXISTS `healths`;
CREATE TABLE `healths`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `healths_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `healths_sex` tinyint(1) NOT NULL DEFAULT 1,
  `healths_job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `healths_heat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `healths_state` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of healths
-- ----------------------------
INSERT INTO `healths` VALUES (11, 'abc', 1, '研发', '36', 0, '2021-03-20 20:52:21', '2021-03-20 20:52:21');
INSERT INTO `healths` VALUES (13, '123', 0, '市场', '38.5', 1, '2021-03-20 21:13:44', '2021-03-20 21:13:44');

-- ----------------------------
-- Table structure for oauths
-- ----------------------------
DROP TABLE IF EXISTS `oauths`;
CREATE TABLE `oauths`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uid` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `oauths_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oauths
-- ----------------------------
INSERT INTO `oauths` VALUES (1, '0bc65e5f8cf068741fb7c5bfd093eabb7512dc9b', 'github', 4397619, 4, '2020-08-11 15:04:19', '2020-08-11 15:04:19');

-- ----------------------------
-- Table structure for rights
-- ----------------------------
DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `rights_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_state` tinyint(1) NULL DEFAULT 1,
  `rights_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pid` int(0) NULL DEFAULT NULL,
  `level` int(0) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `rights_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `rights_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `rights_name`(`rights_name`) USING BTREE,
  INDEX `rights_desc`(`rights_desc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 87 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rights
-- ----------------------------
INSERT INTO `rights` VALUES (42, '菜单权限', '是否可以使用特定菜单', 1, 'menu', '1', 0, 0, NULL, '2021-03-25 20:32:50', '', NULL);
INSERT INTO `rights` VALUES (43, '用户管理', '用户管理菜单', 1, 'menu', '/usersManage', 42, 1, NULL, NULL, '', 'el-icon-user');
INSERT INTO `rights` VALUES (44, '用户列表', '用户列表菜单', 1, 'menu', '/users', 43, 2, NULL, NULL, '', 'el-icon-user-solid');
INSERT INTO `rights` VALUES (45, '权限管理', '是否可以使用权限管理菜单', 1, 'menu', '/rolesManage', 42, 1, NULL, NULL, '', 'el-icon-lock');
INSERT INTO `rights` VALUES (46, '角色列表', '角色列表菜单', 1, 'menu', '/roles', 45, 2, NULL, NULL, '', 'el-icon-key');
INSERT INTO `rights` VALUES (47, '权限列表', '权限列表菜单', 1, 'menu', '/rights', 45, 2, NULL, NULL, '', 'el-icon-unlock');
INSERT INTO `rights` VALUES (48, '路由权限', '是否可以使用特定路由', 1, 'router', '/main', 0, 0, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (49, '用户管理', '用户管理路由', 1, 'router', '', 48, 1, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (50, '用户列表', '用户列表路由', 1, 'router', '/users', 49, 2, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (51, '权限管理', '权限管理路由', 1, 'router', '', 48, 1, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (52, '角色列表', '角色列表路由', 1, 'router', '/roles', 51, 2, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (53, '权限列表', '权限列表路由', 1, 'router', '/rights', 51, 2, NULL, NULL, '', NULL);
INSERT INTO `rights` VALUES (54, '请求权限', '是否可以发送特定请求', 1, 'action', '', 0, 0, NULL, NULL, 'all', NULL);
INSERT INTO `rights` VALUES (55, '用户列表', '用户列表相关请求', 1, 'action', '', 54, 1, NULL, NULL, 'all', NULL);
INSERT INTO `rights` VALUES (56, '获取用户', '用户用户请求', 1, 'action', '/api/v1/users', 55, 2, NULL, NULL, 'get', NULL);
INSERT INTO `rights` VALUES (57, '创建用户', '创建用户请求', 1, 'action', '/api/v1/users', 55, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (58, '更新用户', '更新用户请求', 1, 'action', '/api/v1/users', 55, 2, NULL, NULL, 'put', NULL);
INSERT INTO `rights` VALUES (59, '删除用户', '删除用户请求', 1, 'action', '/api/v1/users', 55, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (60, '角色列表', '角色列表相关请求', 1, 'action', '', 54, 1, NULL, NULL, 'all', NULL);
INSERT INTO `rights` VALUES (61, '获取角色', '获取角色请求', 1, 'action', '/api/v1/roles', 60, 2, NULL, NULL, 'get', NULL);
INSERT INTO `rights` VALUES (62, '创建角色', '创建角色请求', 1, 'action', '/api/v1/roles', 60, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (63, '删除角色', '删除角色请求', 1, 'action', '/api/v1/roles', 60, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (64, '更新角色', '更新角色请求', 1, 'action', '/api/v1/roles', 60, 2, NULL, NULL, 'put', NULL);
INSERT INTO `rights` VALUES (65, '权限列表', '权限列表相关请求', 1, 'action', '', 54, 1, NULL, NULL, 'all', NULL);
INSERT INTO `rights` VALUES (66, '获取权限', '获取权限请求', 1, 'action', '/api/v1/rights', 65, 2, NULL, NULL, 'get', NULL);
INSERT INTO `rights` VALUES (67, '删除权限', '删除权限请求', 1, 'action', '/api/v1/rights', 65, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (68, '创建权限', '创建权限请求', 1, 'action', '/api/v1/rights', 65, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (69, '更新权限', '更新全新请求', 1, 'action', '/api/v1/rights', 65, 2, NULL, NULL, 'put', NULL);
INSERT INTO `rights` VALUES (70, '分配角色', '分配角色请求', 1, 'action', '/api/v1/userrole', 55, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (71, '移出角色', '移出角色请求', 1, 'action', '/api/v1/userrole', 55, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (72, '分配角色', '给用户分配角色', 1, 'action', '/api/v1/userrole', 55, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (73, '移出角色', '移出用户拥有的角色', 1, 'action', '/api/v1/userrole', 55, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (74, '分配权限', '给角色分配权限', 1, 'action', '/api/v1/roleRights', 60, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (75, '移出权限', '移出角色拥有的权限', 1, 'action', '/api/v1/roleRights', 60, 2, NULL, NULL, 'delete', NULL);
INSERT INTO `rights` VALUES (76, '健康列表', '健康列表相关请求', 1, 'action', '', 54, 1, NULL, NULL, 'all', NULL);
INSERT INTO `rights` VALUES (77, '获取健康', '获取健康请求', 1, 'action', '/api/v1/healths', 76, 2, NULL, NULL, 'get', NULL);
INSERT INTO `rights` VALUES (78, '创建健康', '创建健康请求', 1, 'action', '/api/v1/healths', 76, 2, NULL, NULL, 'post', NULL);
INSERT INTO `rights` VALUES (80, '物资管理', '物资管理菜单', 1, 'menu', '/goodsManage', 42, 1, '2021-03-21 13:43:29', '2021-03-21 13:43:29', '', 'el-icon-goods');
INSERT INTO `rights` VALUES (81, '物资列表', '物资列表管理', 1, 'menu', '/goods', 80, 2, '2021-03-21 13:52:25', '2021-03-21 13:52:25', '', 'el-icon-s-order');
INSERT INTO `rights` VALUES (82, '物资管理', '物资管理路由', 1, 'router', '', 48, 1, '2021-03-21 13:57:10', '2021-03-21 13:57:10', '', NULL);
INSERT INTO `rights` VALUES (83, '物资列表', '物资列表路由', 1, 'router', '/goods', 82, 2, '2021-03-21 13:57:47', '2021-03-21 13:57:47', '', NULL);
INSERT INTO `rights` VALUES (84, '物资入库', '物资入库菜单', 1, 'menu', '/goodsIn', 80, 2, '2021-03-21 14:29:36', '2021-03-21 14:29:36', '', 'el-icon-circle-plus-outline');
INSERT INTO `rights` VALUES (85, '物资领用', '物资领用菜单', 1, 'menu', '/goodsOut', 80, 2, '2021-03-21 14:30:17', '2021-03-21 14:30:17', '', 'el-icon-success');
INSERT INTO `rights` VALUES (86, '物资入库', '物资入库路由', 1, 'router', '/goodsIn', 82, 2, '2021-03-21 14:31:16', '2021-03-21 14:31:16', '', '');
INSERT INTO `rights` VALUES (87, '物资领用', '物资领用路由', 1, 'router', '/goodsOut', 82, 2, '2021-03-21 14:31:52', '2021-03-21 14:31:52', '', '');

-- ----------------------------
-- Table structure for role_rights
-- ----------------------------
DROP TABLE IF EXISTS `role_rights`;
CREATE TABLE `role_rights`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NOT NULL,
  `rights_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_rights_ibfk_1`(`role_id`) USING BTREE,
  INDEX `role_rights_ibfk_2`(`rights_id`) USING BTREE,
  CONSTRAINT `role_rights_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `role_rights_ibfk_2` FOREIGN KEY (`rights_id`) REFERENCES `rights` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 248 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_rights
-- ----------------------------
INSERT INTO `role_rights` VALUES (1, 1, 43, '2020-08-27 16:58:18', '2020-08-27 16:58:18');
INSERT INTO `role_rights` VALUES (2, 1, 42, '2020-08-27 16:58:18', '2020-08-27 16:58:18');
INSERT INTO `role_rights` VALUES (7, 1, 44, '2020-08-27 17:22:11', '2020-08-27 17:22:11');
INSERT INTO `role_rights` VALUES (8, 1, 45, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (9, 1, 46, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (10, 1, 47, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (11, 1, 48, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (12, 1, 49, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (13, 1, 50, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (14, 1, 51, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (15, 1, 52, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (16, 1, 53, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (17, 1, 54, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (18, 1, 55, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (19, 1, 56, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (20, 1, 57, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (21, 1, 58, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (22, 1, 59, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (23, 1, 70, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (24, 1, 71, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (25, 1, 60, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (26, 1, 61, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (27, 1, 62, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (28, 1, 63, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (29, 1, 64, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (30, 1, 65, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (31, 1, 66, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (32, 1, 67, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (33, 1, 68, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (34, 1, 69, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (145, 1, 72, NULL, NULL);
INSERT INTO `role_rights` VALUES (146, 1, 73, NULL, NULL);
INSERT INTO `role_rights` VALUES (147, 1, 74, NULL, NULL);
INSERT INTO `role_rights` VALUES (148, 1, 75, NULL, NULL);
INSERT INTO `role_rights` VALUES (149, 1, 76, NULL, NULL);
INSERT INTO `role_rights` VALUES (152, 2, 42, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (153, 2, 43, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (154, 2, 44, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (155, 2, 45, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (156, 2, 46, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (157, 2, 47, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (158, 2, 48, '2021-03-20 21:07:19', '2021-03-20 21:07:19');
INSERT INTO `role_rights` VALUES (159, 2, 49, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (160, 2, 50, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (161, 2, 51, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (162, 2, 52, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (163, 2, 53, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (164, 2, 54, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (165, 2, 55, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (166, 2, 56, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (167, 2, 57, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (168, 2, 58, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (169, 2, 59, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (170, 2, 70, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (171, 2, 71, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (172, 2, 72, '2021-03-20 21:07:20', '2021-03-20 21:07:20');
INSERT INTO `role_rights` VALUES (173, 2, 73, '2021-03-20 21:07:21', '2021-03-20 21:07:21');
INSERT INTO `role_rights` VALUES (174, 2, 60, '2021-03-20 21:07:21', '2021-03-20 21:07:21');
INSERT INTO `role_rights` VALUES (181, 2, 65, '2021-03-20 21:07:21', '2021-03-20 21:07:21');
INSERT INTO `role_rights` VALUES (182, 2, 66, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (183, 2, 67, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (184, 2, 68, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (185, 2, 69, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (186, 2, 76, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (187, 2, 77, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (188, 2, 78, '2021-03-20 21:07:22', '2021-03-20 21:07:22');
INSERT INTO `role_rights` VALUES (189, 4, 76, '2021-03-20 21:08:45', '2021-03-20 21:08:45');
INSERT INTO `role_rights` VALUES (190, 4, 77, '2021-03-20 21:08:45', '2021-03-20 21:08:45');
INSERT INTO `role_rights` VALUES (191, 4, 78, '2021-03-20 21:08:45', '2021-03-20 21:08:45');
INSERT INTO `role_rights` VALUES (192, 4, 54, '2021-03-20 21:08:46', '2021-03-20 21:08:46');
INSERT INTO `role_rights` VALUES (193, 4, 48, '2021-03-20 21:13:00', '2021-03-20 21:13:00');
INSERT INTO `role_rights` VALUES (194, 4, 49, '2021-03-20 21:13:00', '2021-03-20 21:13:00');
INSERT INTO `role_rights` VALUES (196, 4, 51, '2021-03-20 21:13:01', '2021-03-20 21:13:01');
INSERT INTO `role_rights` VALUES (199, 3, 42, '2021-03-20 21:21:51', '2021-03-20 21:21:51');
INSERT INTO `role_rights` VALUES (200, 3, 43, '2021-03-20 21:21:51', '2021-03-20 21:21:51');
INSERT INTO `role_rights` VALUES (201, 3, 44, '2021-03-20 21:21:51', '2021-03-20 21:21:51');
INSERT INTO `role_rights` VALUES (202, 3, 45, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (203, 3, 46, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (204, 3, 47, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (205, 3, 76, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (206, 3, 77, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (207, 3, 78, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (208, 3, 54, '2021-03-20 21:21:52', '2021-03-20 21:21:52');
INSERT INTO `role_rights` VALUES (209, 1, 80, '2021-03-21 13:53:03', '2021-03-21 13:53:03');
INSERT INTO `role_rights` VALUES (211, 1, 82, '2021-03-21 13:58:10', '2021-03-21 13:58:10');
INSERT INTO `role_rights` VALUES (217, 1, 83, '2021-03-21 14:39:00', '2021-03-21 14:39:00');
INSERT INTO `role_rights` VALUES (220, 1, 77, '2021-03-24 20:58:02', '2021-03-24 20:58:02');
INSERT INTO `role_rights` VALUES (221, 1, 78, '2021-03-24 20:58:03', '2021-03-24 20:58:03');
INSERT INTO `role_rights` VALUES (228, 1, 86, '2021-03-24 21:11:16', '2021-03-24 21:11:16');
INSERT INTO `role_rights` VALUES (229, 1, 87, '2021-03-24 21:11:16', '2021-03-24 21:11:16');
INSERT INTO `role_rights` VALUES (232, 4, 45, '2021-03-24 21:23:28', '2021-03-24 21:23:28');
INSERT INTO `role_rights` VALUES (235, 4, 42, '2021-03-24 21:23:30', '2021-03-24 21:23:30');
INSERT INTO `role_rights` VALUES (236, 4, 80, '2021-03-24 21:42:00', '2021-03-24 21:42:00');
INSERT INTO `role_rights` VALUES (237, 4, 81, '2021-03-24 21:42:00', '2021-03-24 21:42:00');
INSERT INTO `role_rights` VALUES (238, 4, 84, '2021-03-24 21:42:00', '2021-03-24 21:42:00');
INSERT INTO `role_rights` VALUES (239, 4, 85, '2021-03-24 21:42:00', '2021-03-24 21:42:00');
INSERT INTO `role_rights` VALUES (240, 4, 82, '2021-03-24 21:43:47', '2021-03-24 21:43:47');
INSERT INTO `role_rights` VALUES (241, 4, 83, '2021-03-24 21:43:47', '2021-03-24 21:43:47');
INSERT INTO `role_rights` VALUES (242, 4, 86, '2021-03-24 21:43:47', '2021-03-24 21:43:47');
INSERT INTO `role_rights` VALUES (243, 4, 87, '2021-03-24 21:43:47', '2021-03-24 21:43:47');
INSERT INTO `role_rights` VALUES (246, 1, 81, '2021-03-25 20:32:14', '2021-03-25 20:32:14');
INSERT INTO `role_rights` VALUES (247, 1, 84, '2021-03-25 20:32:14', '2021-03-25 20:32:14');
INSERT INTO `role_rights` VALUES (248, 1, 85, '2021-03-25 20:32:14', '2021-03-25 20:32:14');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_state` tinyint(1) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name`) USING BTREE,
  UNIQUE INDEX `role_desc`(`role_desc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '管理员', '啥都干的', 1, '2020-08-18 15:27:15', '2020-08-21 19:33:34');
INSERT INTO `roles` VALUES (2, '项目经理', '监工的', 1, '2020-08-18 15:27:15', '2020-08-18 15:27:15');
INSERT INTO `roles` VALUES (3, '产品经理', '吹牛的', 1, '2020-08-18 15:27:15', '2020-08-18 15:27:15');
INSERT INTO `roles` VALUES (4, '开发人员', '干活的', 1, '2020-08-18 15:27:15', '2021-03-19 20:47:58');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200727060756-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200805090832-oauths.ts');
INSERT INTO `sequelizemeta` VALUES ('20200805092012-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200811064553-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818013111-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051258-role.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051258-roles.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051309-userrole.ts');
INSERT INTO `sequelizemeta` VALUES ('20200820102707-rights.ts');
INSERT INTO `sequelizemeta` VALUES ('20200820102756-rolerights.ts');
INSERT INTO `sequelizemeta` VALUES ('20210316140826-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320091421-healths.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320092141-healths.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320092439-healths.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320093819-healths.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320110001-healths.ts');
INSERT INTO `sequelizemeta` VALUES ('20210320110207-healths.ts');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `role_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (2, 1, 2, '2020-08-18 18:51:32', '2020-08-18 18:51:32');
INSERT INTO `user_roles` VALUES (4, 5, 1, '2020-08-18 20:01:52', '2020-08-18 20:01:52');
INSERT INTO `user_roles` VALUES (5, 4, 4, '2020-08-18 20:02:35', '2020-08-18 20:02:35');
INSERT INTO `user_roles` VALUES (8, 1, 1, '2020-08-27 15:27:36', '2020-08-27 15:27:36');
INSERT INTO `user_roles` VALUES (10, 1, 2, '2021-03-20 21:02:24', '2021-03-20 21:02:24');
INSERT INTO `user_roles` VALUES (12, 3, 3, '2021-03-20 21:04:59', '2021-03-20 21:04:59');
INSERT INTO `user_roles` VALUES (13, 2, 4, '2021-03-20 21:10:31', '2021-03-20 21:10:31');
INSERT INTO `user_roles` VALUES (14, 57, 4, '2021-03-25 20:28:20', '2021-03-25 20:28:20');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `user_state` tinyint(1) NOT NULL DEFAULT 1,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/public/avatar.png',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '97606813@qq.com', NULL, '9d3cd696ee8897573f7dacec166821ae', '2020-08-10 12:49:10', '2021-03-25 20:29:37', 1, '/public/upload/d931640f840cf48d5edaed427bf5e646.png');
INSERT INTO `users` VALUES (2, '123', '97606814@qq.com', NULL, '9d3cd696ee8897573f7dacec166821ae', '2020-08-10 12:49:10', '2020-08-10 12:49:10', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (3, NULL, NULL, '17301727164', '5f236c1092868c216022ae0e301210d4', '2020-08-10 12:49:10', '2020-08-10 12:49:10', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (4, '5e686322-7eee-44b4-8133-fc4bb9247df5', '123@it666.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (5, 'def456', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-18 15:27:15', '2020-08-21 17:37:57', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (6, NULL, '976068123@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 0, '/public/avatar.png');
INSERT INTO `users` VALUES (7, NULL, NULL, '13554499123', '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (8, 'it666', 'lnj@it666.com', '13554499321', '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (9, 'lnj123', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-13 14:22:27', '2020-08-13 14:22:27', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (10, 'it666123', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (11, NULL, '97606888@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (12, NULL, NULL, '17301727666', '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 1, '/public/avatar.png');
INSERT INTO `users` VALUES (57, 'abc', NULL, NULL, '9d3cd696ee8897573f7dacec166821ae', '2021-03-25 20:27:56', '2021-03-25 20:27:56', 1, '/public/avatar.png');

SET FOREIGN_KEY_CHECKS = 1;
